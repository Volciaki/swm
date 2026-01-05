import { UserDTO, UUID } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils/unauthorized/error";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { FillCell } from "@/server/modules/warehouse/application/use-cases/FillCell";
import { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import { CreateAssortment } from "@/server/modules/assortment/application/use-cases/CreateAssortment";
import { PutUpAssortmentDTO } from "../dto/PutUpAssortmentDTO";
import { DeleteAssortment } from "@/server/modules/assortment/application/use-cases/DeleteAssortment";
import { CellAlreadyTakenError } from "../errors/CellAlreadyTakenError";

export class PutUpAssortment {
    constructor(
        private readonly getAllAssortmentAction: GetAllAssortment,
        private readonly createAssortmentAction: CreateAssortment,
        private readonly deleteAssortmentAction: DeleteAssortment,
        private readonly fillCellAction: FillCell,
        private readonly getShelfAction: GetShelf,
    ) {}

    async execute(dto: PutUpAssortmentDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        let assortments;

        assortments = await this.getAllAssortmentAction.execute();
        const shelf = await this.getShelfAction.execute({ id: dto.shelfId, assortmentContext: assortments });
        const cellId = UUID.fromString(dto.cellId);
        const cellToUpdate = shelf.cells.flat().find((cell) => cell.id === cellId.value);
        if (cellToUpdate?.assortment !== null && cellToUpdate?.assortment !== undefined) throw new CellAlreadyTakenError(cellId);

        const assortment = await this.createAssortmentAction.execute(
            {
                ...dto.assortment,
                cellId: dto.cellId,
                shelfId: dto.shelfId,
            },
            currentUser,
        );
        assortments = await this.getAllAssortmentAction.execute();
        try {
            await this.fillCellAction.execute(
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

            assortments = await this.getAllAssortmentAction.execute();
            return await this.getShelfAction.execute({ id: dto.shelfId, assortmentContext: assortments });
        } catch (error) {
            await this.deleteAssortmentAction.execute({ id: assortment.id }, currentUser);

            throw error;
        }
    }
}
