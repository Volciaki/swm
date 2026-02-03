import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetNextAssortmentToBeTakenDownByDefinition } from "@/server/modules/storage/application/use-cases/GetNextAssortmentToBeTakenDownByDefinition";
import type { AssortmentDTO } from "@/server/modules/assortment/application/dto/shared/AssortmentDTO";
import { getNextAssortmentToBeTakenDownByDefinitionDTOSchema } from "@/server/modules/storage/application/dto/GetNextAssortmentToBeTakenDownByDefinitionDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const getNextAssortmentToBeTakenDownByDefinition = procedure
	.input(getNextAssortmentToBeTakenDownByDefinitionDTOSchema)
	.query<AssortmentDTO>(async ({ input, ctx }) => {
		const services = getServices(ctx);
		const presets = getPresets(services);

		const assortmentRepository = services.repositories.assortment.db;
		const assortmentDefinitionHelper = presets.assortmentDefinitionHelper.default;

		const fileHelper = presets.fileHelper.default;
		const assortmentFileHelper = presets.assortmentFileHelper.default.get(fileHelper);

		const assortmentDefinitionUtilities = services.utils.assortmentDefinition.default.get(
			assortmentDefinitionHelper,
			assortmentFileHelper
		);

		const getAllAssortment = new GetAllAssortment(assortmentRepository, assortmentDefinitionUtilities);

		const assortmentFIFOQueueManager = services.utils.fifoQueueManager.assortment.get(getAllAssortment);

		const action = new GetNextAssortmentToBeTakenDownByDefinition(getAllAssortment, assortmentFIFOQueueManager);
		return await action.execute(input, ctx.user ?? undefined);
	});
