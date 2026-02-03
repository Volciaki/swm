import { PutUpAssortmentAutomatically } from "@/server/modules/storage/application/use-cases/PutUpAssortmentAutomatically";
import type { PutUpAssortmentResponseDTO } from "@/server/modules/storage/application/dto/PutUpAssortmentResponseDTO";
import { GetAssortmentDefinition } from "@/server/modules/assortment/application/use-cases/GetAssortmentDefinition";
import { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { putUpAssortmentAutomaticallyDTOSchema } from "@/server/modules/storage/application/dto/PutUpAssortmentAutomaticallyDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const putUpAssortmentAutomatically = procedure
	.input(putUpAssortmentAutomaticallyDTOSchema)
	.mutation<PutUpAssortmentResponseDTO>(async ({ input, ctx }) => {
		const services = getServices(ctx);
		const presets = getPresets(services);

		const assortmentRepository = services.repositories.assortment.db;
		const assortmentDefinitionHelper = presets.assortmentDefinitionHelper.default;
		const shelfRepository = services.repositories.shelf.db;

		const fileHelper = presets.fileHelper.default;
		const assortmentFileHelper = presets.assortmentFileHelper.default.get(fileHelper);
		const assortmentDefinitionUtilities = services.utils.assortmentDefinition.default.get(
			assortmentDefinitionHelper,
			assortmentFileHelper
		);

		const getAllAssortment = new GetAllAssortment(assortmentRepository, assortmentDefinitionUtilities);
		const getAssortmentDefinition = new GetAssortmentDefinition(assortmentDefinitionHelper, assortmentFileHelper);
		const getAllShelves = new GetAllShelves(shelfRepository);

		const storageAssortmentHelper = presets.storageAssortmentHelper.default;

		const action = new PutUpAssortmentAutomatically(
			getAssortmentDefinition,
			getAllAssortment,
			getAllShelves,
			storageAssortmentHelper
		);
		return await action.execute(input, ctx.user ?? undefined);
	});
