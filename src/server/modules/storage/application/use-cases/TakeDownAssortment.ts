import { UnauthorizedError } from "@/server/utils/unauthorized/error";
import { UserDTO, UUID } from "@/server/utils";
import { DeleteAssortment } from "@/server/modules/assortment/application/use-cases/DeleteAssortment";
import { GetAssormtent } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import { EmptyCell } from "@/server/modules/warehouse/application/use-cases/EmptyCell";
import { GetAllAssormtent } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { AssortmentNoCellError } from "../errors/AssortmentNoCellError";
import { TakeDownAssortmentDTO } from "../dto/TakeDownAssortmentDTO";

export class TakeDownAssortment {
    constructor(
        private readonly getAssortmentAction: GetAssormtent,
        private readonly getAllAssortmentAction: GetAllAssormtent,
        private readonly deleteAssortmentAction: DeleteAssortment,
        private readonly getShelfAction: GetShelf,
        private readonly emptyCellAction: EmptyCell,
    ) {}

    async execute(dto: TakeDownAssortmentDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const assortment = await this.getAssortmentAction.execute({ id: dto.assortmentId });
        const assortments = await this.getAllAssortmentAction.execute();
        const shelf = await this.getShelfAction.execute({ id: assortment.shelfId, assortmentContext: assortments });

        const cellToUpdate = shelf.cells.flat().find((cell) => cell.id === assortment.cellId);

        if (!cellToUpdate)
            throw new AssortmentNoCellError(UUID.fromString(assortment.id), UUID.fromString(assortment.cellId));

        if (cellToUpdate.assortment === null) return;

        cellToUpdate.assortment = null;
        await this.deleteAssortmentAction.execute({ id: assortment.id }, currentUser);
        const newAssortments = await this.getAllAssortmentAction.execute();
        return await this.emptyCellAction.execute(
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
}
