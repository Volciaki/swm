import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { CreateAssortment } from "@/server/modules/assortment/application/use-cases/CreateAssortment";
import { DeleteAssortment } from "@/server/modules/assortment/application/use-cases/DeleteAssortment";
import { ImportAssortment } from "@/server/modules/assortment/application/use-cases/ImportAssortment";
import { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import { FillCell } from "@/server/modules/warehouse/application/use-cases/FillCell";
import { EmptyCell } from "@/server/modules/warehouse/application/use-cases/EmptyCell";
import { AssortmentDTO } from "@/server/modules/assortment/application/dto/shared/AssortmentDTO";
import { ImportAndReplaceAssortment } from "@/server/modules/storage/application/use-cases/ImportAndReplaceAssortment";
import { importAndReplaceAssortmentDTOSchema } from "@/server/modules/storage/application/dto/ImportAndReplaceAssortmentDTO";
import { getServices } from "../../services";
import { procedure } from "../../init";

export const importAssortment = procedure.input(importAndReplaceAssortmentDTOSchema).mutation<AssortmentDTO[]>(async ({ input, ctx }) => {
    const services = getServices(ctx);
    const assortmentRepository = services.repositories.assortment.db;
    const shelfRepository = services.repositories.shelf.db;
    const uuidManager = services.utils.uuidManager.default;

    const assortmentHelper = services.helpers.assortment.default.get(assortmentRepository, uuidManager);
    const shelfHelper = services.helpers.shelf.default.get(shelfRepository, uuidManager);

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

    const action = new ImportAndReplaceAssortment(storageAssortmentHelper);
    return await action.execute(input, ctx.user ?? undefined);
});
