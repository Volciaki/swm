import { UnauthorizedError } from "@/server/utils/unauthorized/error";
import { UserDTO, UUID } from "@/server/utils";
import { DeleteAssortment } from "@/server/modules/assortment/application/use-cases/DeleteAssortment";
import { TakeDownAssortmentDTO } from "../dto/TakeDownAssortmentDTO";
import { GetAssormtent } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import { AssortmentNoCellError } from "../errors/AssortmentNoCellError";
import { EmptyCell } from "@/server/modules/warehouse/application/use-cases/EmptyCell";

export class TakeDownAssortment {
    constructor(
        private readonly getAssortmentAction: GetAssormtent,
        private readonly deleteAssortmentAction: DeleteAssortment,
        private readonly getShelfAction: GetShelf,
        private readonly emptyCellAction: EmptyCell,
    ) {}

    async execute(dto: TakeDownAssortmentDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const assortment = await this.getAssortmentAction.execute({ id: dto.assortmentId });
        const shelf = await this.getShelfAction.execute({ id: assortment.shelfId });

        const cellToUpdate = shelf.cells.flat().find((cell) => cell.id === assortment.cellId);

        if (!cellToUpdate)
            throw new AssortmentNoCellError(UUID.fromString(assortment.id), UUID.fromString(assortment.cellId));

        if (cellToUpdate.assortment === null) return;

        cellToUpdate.assortment = null;
        await this.deleteAssortmentAction.execute({ id: assortment.id });
        return await this.emptyCellAction.execute({
            cellId: cellToUpdate.id,
            shelfId: cellToUpdate.shelfId,
        });
    }
}
