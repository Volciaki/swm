import { ShelfDTO } from "@/server/modules/warehouse/application/dto/shared/ShelfDTO";
import { GetFullShelf } from "@/server/modules/storage/application/use-cases/GetFullShelf";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import { PutUpAssortment } from "@/server/modules/storage/application/use-cases/PutUpAssortment";
import { CreateAssortment } from "@/server/modules/assortment/application/use-cases/CreateAssortment";
import { FillCell } from "@/server/modules/warehouse/application/use-cases/FillCell";
import { TakeDownAssortment } from "@/server/modules/storage/application/use-cases/TakeDownAssortment";
import { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { DeleteAssortment } from "@/server/modules/assortment/application/use-cases/DeleteAssortment";
import { CreateShelf } from "@/server/modules/warehouse/application/use-cases/CreateShelf";
import { EmptyCell } from "@/server/modules/warehouse/application/use-cases/EmptyCell";
import { TakeDownShelf } from "@/server/modules/storage/application/use-cases/TakeDownShelf";
import { DeleteShelf } from "@/server/modules/warehouse/application/use-cases/DeleteShelf";
import { UpdateShelfAssortment } from "@/server/modules/storage/application/use-cases/UpdateShelfAssortment";
import { UpdateAssortment } from "@/server/modules/assortment/application/use-cases/UpdateAssortment";
import { ValidateShelf } from "@/server/modules/warehouse/application/use-cases/ValidateShelf";
import { UpdateFullShelf } from "@/server/modules/storage/application/use-cases/UpdateFullShelf";
import { UpdateShelf } from "@/server/modules/warehouse/application/use-cases/UpdateShelf";
import { AssortmentDTO } from "@/server/modules/assortment/application/dto/shared/AssortmentDTO";
import { ImportShelves } from "@/server/modules/warehouse/application/use-cases/ImportShelves";
import { ImportAssortment } from "@/server/modules/assortment/application/use-cases/ImportAssortment";
import { ImportAndReplaceAssortment } from "@/server/modules/storage/application/use-cases/ImportAndReplaceAssortment";
import { ImportAndReplaceShelves } from "@/server/modules/storage/application/use-cases/ImportAndReplaceShelves";
import { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import { createShelfDTOSchema } from "@/server/modules/warehouse/application/dto/shared/CreateShelfDTO";
import { getFullShelfDTOSchema } from "@/server/modules/storage/application/dto/GetFullShelfDTO";
import { putUpAssortmentDTOSchema } from "@/server/modules/storage/application/dto/PutUpAssortmentDTO";
import { takeDownAssortmentDTOSchema } from "@/server/modules/storage/application/dto/TakeDownAssortmentDTO";
import { takeDownShelfDTOSchema } from "@/server/modules/storage/application/dto/TakeDownShelfDTO";
import { updateShelfAssortmentDTOSchema } from "@/server/modules/storage/application/dto/UpdateShelfAssortmentDTO";
import { updateFullShelfDTOSchema } from "@/server/modules/storage/application/dto/UpdateFullShelf";
import { getAssortmentDTOSchema } from "@/server/modules/assortment/application/dto/GetAssortmentDTO";
import { importAndReplaceShelvesDTOSchema } from "@/server/modules/storage/application/dto/ImportAndReplaceShelvesDTO";
import { importAndReplaceAssortmentDTOSchema } from "@/server/modules/storage/application/dto/ImportAndReplaceAssortmentDTO";
import { createRouter, procedure } from "../init";
import { getServices } from "../services";

export const storageRouter = createRouter({
    createShelf: procedure.input(createShelfDTOSchema).mutation<ShelfDTO>(async ({ input, ctx }) => {
        const services = getServices(ctx);
        const shelfRepository = services.repositories.shelf.db;
        const uuidManager = services.utils.uuidManager.default;

        const shelfHelper = services.helpers.shelf.default.get(shelfRepository, uuidManager);

        const action = new CreateShelf(shelfHelper);
        return await action.execute(input, ctx.user ?? undefined);
    }),
    importShelves: procedure.input(importAndReplaceShelvesDTOSchema).mutation<ShelfDTO[]>(async ({ input, ctx }) => {
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
    }),
    getShelf: procedure.input(getFullShelfDTOSchema).query<ShelfDTO>(async ({ input, ctx }) => {
        const services = getServices(ctx);
        const assortmentRepository = services.repositories.assortment.db;
        const shelfRepository = services.repositories.shelf.db;
        const uuidManager = services.utils.uuidManager.default;

        const shelfHelper = services.helpers.shelf.default.get(shelfRepository, uuidManager);

        const getAllAssortmentAction = new GetAllAssortment(assortmentRepository);
        const getShelfAction = new GetShelf(shelfHelper);

        const action = new GetFullShelf(getAllAssortmentAction, getShelfAction);
        return await action.execute(input);
    }),
    updateShelf: procedure.input(updateFullShelfDTOSchema).mutation<ShelfDTO>(async ({ input, ctx }) => {
        const services = getServices(ctx);
        const assortmentRepository = services.repositories.assortment.db;
        const shelfRepository = services.repositories.shelf.db;
        const uuidManager = services.utils.uuidManager.default;
        
        const shelfHelper = services.helpers.shelf.default.get(shelfRepository, uuidManager);
        
        const getAllAssortmentAction = new GetAllAssortment(assortmentRepository);
        const updateShelfAction = new UpdateShelf(shelfHelper, shelfRepository);
        
        const action = new UpdateFullShelf(getAllAssortmentAction, updateShelfAction);
        return await action.execute(input, ctx.user ?? undefined);
    }),
    deleteShelf: procedure.input(takeDownShelfDTOSchema).mutation<void>(async ({ input, ctx }) => {
        const services = getServices(ctx);
        const assortmentRepository = services.repositories.assortment.db;
        const shelfRepository = services.repositories.shelf.db;
        const uuidManager = services.utils.uuidManager.default;

        const shelfHelper = services.helpers.shelf.default.get(shelfRepository, uuidManager);

        const getAllAssortmentAction = new GetAllAssortment(assortmentRepository);
        const deleteShelfAction = new DeleteShelf(shelfHelper, shelfRepository);

        const action = new TakeDownShelf(getAllAssortmentAction, deleteShelfAction);
        return await action.execute(input, ctx.user ?? undefined);
    }),
    createAssortment: procedure.input(putUpAssortmentDTOSchema).mutation<ShelfDTO>(async ({ input, ctx }) => {
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

        const action = new PutUpAssortment(storageAssortmentHelper);
        return await action.execute(input, ctx.user ?? undefined);
    }),
    importAssortment: procedure.input(importAndReplaceAssortmentDTOSchema).mutation<AssortmentDTO[]>(async ({ input, ctx }) => {
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
    }),
    getAssortment: procedure.input(getAssortmentDTOSchema).query<AssortmentDTO>(async ({ input, ctx }) => {
        const services = getServices(ctx);
        const assortmentRepository = services.repositories.assortment.db;
        const uuidManager = services.utils.uuidManager.default;

        const assortmentHelper = services.helpers.assortment.default.get(assortmentRepository, uuidManager);

        const action = new GetAssortment(assortmentHelper);
        return await action.execute(input);
    }),
    updateAssortment: procedure.input(updateShelfAssortmentDTOSchema).mutation<AssortmentDTO>(async ({ input, ctx }) => {
        const services = getServices(ctx);
        const assortmentRepository = services.repositories.assortment.db;
        const shelfRepository = services.repositories.shelf.db;
        const uuidManager = services.utils.uuidManager.default;

        const shelfHelper = services.helpers.shelf.default.get(shelfRepository, uuidManager);
        const assortmentHelper = services.helpers.assortment.default.get(assortmentRepository, uuidManager);

        const getAssortmentAction = new GetAssortment(assortmentHelper);
        const updateAssortmentAction = new UpdateAssortment(assortmentRepository, assortmentHelper);
        const getAllAssortmentAction = new GetAllAssortment(assortmentRepository);
        const validateShelfAction = new ValidateShelf(shelfHelper);

        const action = new UpdateShelfAssortment(getAssortmentAction, updateAssortmentAction, getAllAssortmentAction, validateShelfAction);
        return await action.execute(input, ctx.user ?? undefined);
    }),
    deleteAssortment: procedure.input(takeDownAssortmentDTOSchema).mutation<ShelfDTO>(async ({ input, ctx }) => {
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
    }),
});
