import { ShelfDTO } from "@/server/modules/warehouse/application/dto/shared/ShelfDTO";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import { GetFullShelf } from "@/server/modules/storage/application/use-cases/GetFullShelf";
import { getServices } from "../../services";
import { procedure } from "../../init";
import { getFullShelfDTOSchema } from "@/server/modules/storage/application/dto/GetFullShelfDTO";

export const getShelf = procedure.input(getFullShelfDTOSchema).query<ShelfDTO>(async ({ input, ctx }) => {
    const services = getServices(ctx);
    const assortmentRepository = services.repositories.assortment.db;
    const shelfRepository = services.repositories.shelf.db;
    const uuidManager = services.utils.uuidManager.default;

    const shelfHelper = services.helpers.shelf.default.get(shelfRepository, uuidManager);

    const getAllAssortmentAction = new GetAllAssortment(assortmentRepository);
    const getShelfAction = new GetShelf(shelfHelper);

    const action = new GetFullShelf(getAllAssortmentAction, getShelfAction);
    return await action.execute(input);
});
