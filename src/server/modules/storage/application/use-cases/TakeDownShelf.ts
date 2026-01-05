import { GetAllAssormtent } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { DeleteShelf } from "@/server/modules/warehouse/application/use-cases/DeleteShelf";
import { UnauthorizedError, UserDTO } from "@/server/utils";
import { TakeDownShelfDTO } from "../dto/TakeDownShelfDTO";

export class TakeDownShelf {
    constructor(
        private readonly getAllAssortment: GetAllAssormtent,
        private readonly deleteShelfAction: DeleteShelf,
    ) {}

    async execute(dto: TakeDownShelfDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const assortments = await this.getAllAssortment.execute();
        await this.deleteShelfAction.execute(
            { id: dto.id, assortmentContext: assortments },
            currentUser
        );
    }
}
