import { UnauthorizedError, UserDTO } from "@/server/utils";
import { UpdateFullShelfDTO } from "../dto/UpdateFullShelf";
import { GetAllAssormtent } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { UpdateShelf } from "@/server/modules/warehouse/application/use-cases/UpdateShelf";

export class UpdateFullShelf {
    constructor(
        private readonly getAllAssortmentAction: GetAllAssormtent,
        private readonly updateShelfAction: UpdateShelf,
    ) {}

    async execute(dto: UpdateFullShelfDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const assortments = await this.getAllAssortmentAction.execute();
        return await this.updateShelfAction.execute(
            {
                shelf: {
                    id: dto.shelfId,
                    assortmentContext: assortments,
                },
                newData: dto.newData,
            },
            currentUser,
        );
    }
}
