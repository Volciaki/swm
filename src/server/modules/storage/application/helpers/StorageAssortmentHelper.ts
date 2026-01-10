import { CreateAssortment } from "@/server/modules/assortment/application/use-cases/CreateAssortment";
import { DeleteAssortment } from "@/server/modules/assortment/application/use-cases/DeleteAssortment";
import { FillCell } from "@/server/modules/warehouse/application/use-cases/FillCell";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import { EmptyCell } from "@/server/modules/warehouse/application/use-cases/EmptyCell";
import { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { UserDTO, UUID } from "@/server/utils";
import { AssortmentNoCellError } from "../errors/AssortmentNoCellError";
import { ShelfDTO } from "../dto/shared/ShelfDTO";
import { CellAlreadyTakenError } from "../errors/CellAlreadyTakenError";
import { TakeDownAssortmentDTO } from "../dto/TakeDownAssortmentDTO";
import { PutUpAssortmentDTO } from "../dto/PutUpAssortmentDTO";
import { AssortmentDTO } from "../dto/shared/AssortmentDTO";
import { CreateAssortmentDTO } from "../dto/shared/CreateAssortmentDTO";
import { ImportAndReplaceAssortmentDTO } from "../dto/ImportAndReplaceAssortmentDTO";
import { PutUpAssortmentResponseDTO } from "../dto/PutUpAssortmentResponseDTO";

export interface StorageAssortmentHelper {
    putUpAssortmentByDTO(dto: PutUpAssortmentDTO, currentUser: UserDTO): Promise<PutUpAssortmentResponseDTO>;
    takeDownAssortmentByDTO(dto: TakeDownAssortmentDTO, currentUser: UserDTO): Promise<ShelfDTO>;
    importAndReplaceAssortment(dto: ImportAndReplaceAssortmentDTO, currentUser: UserDTO): Promise<AssortmentDTO[]>;
};

export class DefaultStorageAssortmentHelper implements StorageAssortmentHelper {
    constructor(
        private readonly getAllAssortment: GetAllAssortment,
        private readonly getAssortment: GetAssortment,
        private readonly createAssortment: CreateAssortment,
        private readonly deleteAssortment: DeleteAssortment,
        private readonly getShelf: GetShelf,
        private readonly fillCell: FillCell,
        private readonly emptyCell: EmptyCell,
    ) {}

    async putUpAssortmentByDTO(dto: PutUpAssortmentDTO, currentUser: UserDTO) {
        let assortments;

        assortments = await this.getAllAssortment.execute();
        const shelf = await this.getShelf.execute({ id: dto.shelfId, assortmentContext: assortments });
        const cellId = UUID.fromString(dto.cellId);
        const cellToUpdate = shelf.cells.flat().find((cell) => cell.id === cellId.value);
        if (cellToUpdate?.assortment !== null && cellToUpdate?.assortment !== undefined) throw new CellAlreadyTakenError(cellId);

        const assortment = await this.createAssortment.execute(
            {
                ...dto.assortment,
                cellId: dto.cellId,
                shelfId: dto.shelfId,
            },
            currentUser,
        );
        assortments = await this.getAllAssortment.execute();
        try {
            await this.fillCell.execute(
                {
                    shelf: {
                        id: dto.shelfId,
                        assortmentContext: assortments,
                    },
                    cellId: dto.cellId,
                    assortment,
                },
                currentUser,
            );

            assortments = await this.getAllAssortment.execute();
			const shelf = await this.getShelf.execute({ id: dto.shelfId, assortmentContext: assortments });
			return {
				shelf,
				newAssortment: assortment,
			};
        } catch (error) {
            await this.deleteAssortment.execute({ id: assortment.id }, currentUser);

            throw error;
        }
    }

    async takeDownAssortmentByDTO(dto: TakeDownAssortmentDTO, currentUser: UserDTO) {
        const assortment = await this.getAssortment.execute({ id: dto.id });
        const assortments = await this.getAllAssortment.execute();
        const shelf = await this.getShelf.execute({ id: assortment.shelfId, assortmentContext: assortments });

        const cellToUpdate = shelf.cells.flat().find((cell) => cell.id === assortment.cellId);

        if (!cellToUpdate)
            throw new AssortmentNoCellError(UUID.fromString(assortment.id), UUID.fromString(assortment.cellId));

        if (cellToUpdate.assortment === null) return shelf;

        cellToUpdate.assortment = null;
        await this.deleteAssortment.execute({ id: assortment.id }, currentUser);
        const newAssortments = await this.getAllAssortment.execute();
        return await this.emptyCell.execute(
            {
                cellId: cellToUpdate.id,
                shelf: {
                    id: cellToUpdate.shelfId,
                    assortmentContext: newAssortments,
                },
            },
            currentUser
        );
    }

    async importAndReplaceAssortment(dto: ImportAndReplaceAssortmentDTO, currentUser: UserDTO) {
        const currentAssortments = await this.getAllAssortment.execute();

        try {
            await this.takeDownAssortments(currentAssortments, currentUser);
            await this.putUpAssortments(dto.assortment, currentUser);
            return await this.getAllAssortment.execute();
        } catch (error) {
            // Attempt to rollback the changes if an error occurred.
            const newAssortments = await this.getAllAssortment.execute();
            await this.takeDownAssortments(newAssortments, currentUser);
            await this.putUpAssortments(currentAssortments, currentUser);

            throw error;
        }
    }

    private async takeDownAssortments(assortments: AssortmentDTO[], currentUser: UserDTO) {
        for (const assortment of assortments) {
            await this.takeDownAssortmentByDTO({ id: assortment.id }, currentUser);
        }
    }

    private async putUpAssortments(assortments: CreateAssortmentDTO[], currentUser: UserDTO) {
        for (const assortment of assortments) {
            await this.putUpAssortmentByDTO(
                { shelfId: assortment.shelfId, cellId: assortment.cellId, assortment: assortment },
                currentUser
            );
        }
    }
}
