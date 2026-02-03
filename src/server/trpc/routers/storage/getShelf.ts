import type { FullShelfDTO } from "@/server/modules/storage/application/dto/shared/FullShelfDTOSchema";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import { GetFullShelf } from "@/server/modules/storage/application/use-cases/GetFullShelf";
import { getFullShelfDTOSchema } from "@/server/modules/storage/application/dto/GetFullShelfDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const getShelf = procedure.input(getFullShelfDTOSchema).query<FullShelfDTO>(async ({ input, ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const assortmentRepository = services.repositories.assortment.db;

	const shelfHelper = presets.shelfHelper.default;
	const fileHelper = presets.fileHelper.default;
	const assortmentFileHelper = presets.assortmentFileHelper.default.get(fileHelper);
	const assortmentDefinitionHelper = presets.assortmentDefinitionHelper.default;
	const assortmentDefinitionUtilities = services.utils.assortmentDefinition.default.get(
		assortmentDefinitionHelper,
		assortmentFileHelper
	);

	const getAllAssortmentAction = new GetAllAssortment(assortmentRepository, assortmentDefinitionUtilities);
	const getShelfAction = new GetShelf(shelfHelper);

	const storageShelfHelper = services.helpers.storageShelf.default.get(getAllAssortmentAction, getShelfAction);

	const action = new GetFullShelf(storageShelfHelper);
	return await action.execute(input);
});
