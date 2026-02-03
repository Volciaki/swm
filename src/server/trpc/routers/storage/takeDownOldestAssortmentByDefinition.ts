import type { ShelfDTO } from "@/server/modules/warehouse/application/dto/shared/ShelfDTO";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { TakeDownOldestAssortmentByDefinition } from "@/server/modules/storage/application/use-cases/TakeDownOldestAssortmentByDefinition";
import { takeDownOldestAssortmentByDefinitionDTOSchema } from "@/server/modules/storage/application/dto/TakeDownOldestAssortmentByDefinitionDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const takeDownOldestAssortmentByDefinition = procedure
	.input(takeDownOldestAssortmentByDefinitionDTOSchema)
	.mutation<ShelfDTO>(async ({ input, ctx }) => {
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
		const storageAssortmentHelper = presets.storageAssortmentHelper.default;

		const action = new TakeDownOldestAssortmentByDefinition(
			getAllAssortment,
			assortmentFIFOQueueManager,
			storageAssortmentHelper
		);
		return await action.execute(input, ctx.user ?? undefined);
	});
