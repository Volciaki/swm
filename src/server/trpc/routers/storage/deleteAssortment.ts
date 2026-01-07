import { ShelfDTO } from "@/server/modules/warehouse/application/dto/shared/ShelfDTO";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { CreateAssortment } from "@/server/modules/assortment/application/use-cases/CreateAssortment";
import { DeleteAssortment } from "@/server/modules/assortment/application/use-cases/DeleteAssortment";
import { ImportAssortment } from "@/server/modules/assortment/application/use-cases/ImportAssortment";
import { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import { FillCell } from "@/server/modules/warehouse/application/use-cases/FillCell";
import { EmptyCell } from "@/server/modules/warehouse/application/use-cases/EmptyCell";
import { TakeDownAssortment } from "@/server/modules/storage/application/use-cases/TakeDownAssortment";
import { takeDownAssortmentDTOSchema } from "@/server/modules/storage/application/dto/TakeDownAssortmentDTO";
import { getServices } from "../../services";
import { procedure } from "../../init";

export const deleteAssortment = procedure.input(takeDownAssortmentDTOSchema).mutation<ShelfDTO>(async ({ input, ctx }) => {
    const services = getServices(ctx);
    const assortmentRepository = services.repositories.assortment.db;
    const shelfRepository = services.repositories.shelf.db;
    const uuidManager = services.utils.uuidManager.default;

    const shelfHelper = services.helpers.shelf.default.get(shelfRepository, uuidManager);
    const assortmentHelper = services.helpers.assortment.default.get(assortmentRepository, uuidManager);

    const getAllAssortmentAction = new GetAllAssortment(assortmentRepository);
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

    const action = new TakeDownAssortment(storageAssortmentHelper);
    return await action.execute(input, ctx.user ?? undefined);
});
