import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { PutUpAssortmentCopy } from "@/server/modules/storage/application/use-cases/PutUpAssortmentCopy";
import { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import { PutUpAssortmentResponseDTO } from "@/server/modules/storage/application/dto/PutUpAssortmentResponseDTO";
import { putUpAssortmentCopyDTOSchema } from "@/server/modules/storage/application/dto/PutUpAssortmentCopyDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const createAssortmentCopy = procedure.input(putUpAssortmentCopyDTOSchema).mutation<PutUpAssortmentResponseDTO>(async ({ input, ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const shelfRepository = services.repositories.shelf.db;
	const assortmentRepository = services.repositories.assortment.db;

	const storageAssortmentHelper = presets.storageAssortmentHelper.default;
	const assortmentHelper = presets.assortmentHelper.default;

	const getAssortmentAction = new GetAssortment(assortmentHelper);
	const getAllShelvesAction = new GetAllShelves(shelfRepository);
	const getAllAssortmentAction = new GetAllAssortment(assortmentRepository);

	const action = new PutUpAssortmentCopy(storageAssortmentHelper, getAssortmentAction, getAllShelvesAction, getAllAssortmentAction);
	return await action.execute(input, ctx.user ?? undefined);
});
