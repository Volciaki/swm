import { ShelfDTO } from "@/server/modules/warehouse/application/dto/shared/ShelfDTO";
import { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { DeleteShelf } from "@/server/modules/warehouse/application/use-cases/DeleteShelf";
import { ImportShelves } from "@/server/modules/warehouse/application/use-cases/ImportShelves";
import { CreateShelf } from "@/server/modules/warehouse/application/use-cases/CreateShelf";
import { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { CreateAssortment } from "@/server/modules/assortment/application/use-cases/CreateAssortment";
import { DeleteAssortment } from "@/server/modules/assortment/application/use-cases/DeleteAssortment";
import { ImportAssortment } from "@/server/modules/assortment/application/use-cases/ImportAssortment";
import { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import { FillCell } from "@/server/modules/warehouse/application/use-cases/FillCell";
import { EmptyCell } from "@/server/modules/warehouse/application/use-cases/EmptyCell";
import { ImportAndReplaceShelves } from "@/server/modules/storage/application/use-cases/ImportAndReplaceShelves";
import { importAndReplaceShelvesDTOSchema } from "@/server/modules/storage/application/dto/ImportAndReplaceShelvesDTO";
import { getServices } from "../../services";
import { procedure } from "../../init";

export const importShelves = procedure.input(importAndReplaceShelvesDTOSchema).mutation<ShelfDTO[]>(async ({ input, ctx }) => {
    const services = getServices(ctx);
    const shelfRepository = services.repositories.shelf.db;
    const assortmentRepository = services.repositories.assortment.db;
    const uuidManager = services.utils.uuidManager.default;

    const assortmentHelper = services.helpers.assortment.default.get(assortmentRepository, uuidManager);
    const shelfHelper = services.helpers.shelf.default.get(shelfRepository, uuidManager);

    const getAllShelvesAction = new GetAllShelves(shelfRepository);
    const getAllAssortmentAction = new GetAllAssortment(assortmentRepository);
    const deleteShelfAction = new DeleteShelf(shelfHelper, shelfRepository);
    const importShelvesAction = new ImportShelves(shelfHelper);
    const createShelfAction = new CreateShelf(shelfHelper);
    const getAssortmentAction = new GetAssortment(assortmentHelper);
    const createAssortmentAction = new CreateAssortment(assortmentHelper);
    const deleteAssortmentAction = new DeleteAssortment(assortmentRepository, assortmentHelper);
    const importAssortmentAction = new ImportAssortment(assortmentHelper);
    const getShelfAction = new GetShelf(shelfHelper);
    const fillCellAction = new FillCell(shelfRepository, shelfHelper);
    const emptyCellAction = new EmptyCell(shelfRepository, shelfHelper);

    const storageAssortmentHelper = services.helpers.storageAssortment.default.get(
        getAllAssortmentAction,
        getAssortmentAction,
        createAssortmentAction,
        deleteAssortmentAction,
        importAssortmentAction,
        getShelfAction,
        fillCellAction,
        emptyCellAction,
    );

    const action = new ImportAndReplaceShelves(
        getAllShelvesAction,
        getAllAssortmentAction,
        deleteShelfAction,
        createShelfAction,
        importShelvesAction,
        storageAssortmentHelper,
    );
    return await action.execute(input, ctx.user ?? undefined);
});
