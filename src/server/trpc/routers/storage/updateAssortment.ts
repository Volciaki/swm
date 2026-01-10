import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { AssortmentDTO } from "@/server/modules/assortment/application/dto/shared/AssortmentDTO";
import { UpdateAssortment } from "@/server/modules/assortment/application/use-cases/UpdateAssortment";
import { ValidateShelf } from "@/server/modules/warehouse/application/use-cases/ValidateShelf";
import { UpdateShelfAssortment } from "@/server/modules/storage/application/use-cases/UpdateShelfAssortment";
import { updateShelfAssortmentDTOSchema } from "@/server/modules/storage/application/dto/UpdateShelfAssortmentDTO";
import { getServices } from "../../services";
import { procedure } from "../../init";

export const updateAssortment = procedure.input(updateShelfAssortmentDTOSchema).mutation<AssortmentDTO>(async ({ input, ctx }) => {
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
});
