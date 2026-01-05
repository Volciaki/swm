import { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils/unauthorized/error";
import { GetAllAssormtent } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { FillCell } from "@/server/modules/warehouse/application/use-cases/FillCell";
import { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import { PutUpAssortmentDTO } from "../dto/PutUpAssortment";
import { GetAssormtent } from "@/server/modules/assortment/application/use-cases/GetAssortment";

export class PutUpAssortment {
    constructor(
        private readonly getAllAssortmentAction: GetAllAssormtent,
        private readonly getAssortmentAction: GetAssormtent,
        private readonly fillCellAction: FillCell,
        private readonly getShelfAction: GetShelf,
    ) {}

    async execute(dto: PutUpAssortmentDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const assortment = await this.getAssortmentAction.execute({ id: dto.assortmentId });
        const assortments = await this.getAllAssortmentAction.execute();
        this.fillCellAction.execute({
            shelf: {
                id: dto.shelfId,
                assortmentContext: assortments,
            },
            cellId: dto.cellId,
            assortment,
        });

        const assortmentsNew = await this.getAllAssortmentAction.execute();
        return await this.getShelfAction.execute({ id: dto.shelfId, assortmentContext: assortmentsNew });
    }
}
