import { DeleteShelf } from "@/server/modules/warehouse/application/use-cases/DeleteShelf";
import { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import { ImportShelves } from "@/server/modules/warehouse/application/use-cases/ImportShelves";
import { UnauthorizedError, UserDTO } from "@/server/utils";
import { ImportAndReplaceShelvesDTO } from "../dto/ImportAndReplaceShelvesDTO";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";

export class ImportAndReplaceShelves {
    constructor(
        private readonly getAllShelves: GetAllShelves,
        private readonly getAllAssortment: GetAllAssortment,
        private readonly deleteShelf: DeleteShelf,
        private readonly importShelvesAction: ImportShelves,
    ) {}

    async execute(dto: ImportAndReplaceShelvesDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const assortment = await this.getAllAssortment.execute();
        const currentShelves = await this.getAllShelves.execute();
        for (const shelf of currentShelves) {
            await this.deleteShelf.execute(
                { id: shelf.id, assortmentContext: assortment },
                currentUser
            );
        }

        return await this.importShelvesAction.execute(dto, currentUser);
    }
}
