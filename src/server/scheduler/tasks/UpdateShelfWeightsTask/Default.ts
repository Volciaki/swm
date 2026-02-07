import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import { UpdateShelf } from "@/server/modules/warehouse/application/use-cases/UpdateShelf";
import type { GetServicesContext } from "@/server/trpc/services/context";
import { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import { getPresets, getServices } from "@/server/trpc/services";
import { UpdateShelfWeightsTask } from "@/server/modules/warehouse/infrastructure/schedule/UpdateShelfWeightsTask";
import { StoreWeightReading } from "@/server/modules/warehouse/application/use-cases/StoreWeightReading";

export const getDefaultUpdateShelfWeightsPreset = (ctx: GetServicesContext) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const assortmentRepository = services.repositories.assortment.db;
	const fileHelper = presets.fileHelper.default;

	const getFileAction = new GetFile(fileHelper);

	const assortmentFileHelper = services.helpers.assortmentFile.default.get(getFileAction);
	const weightReadingRepository = services.repositories.weightReading.db;
	const shelfRepository = services.repositories.shelf.db;
	const shelfScale = services.utils.shelfScale.random;
	const uuidManager = services.utils.uuidManager.default;
	const shelfHelper = presets.shelfHelper.default;
	const assortmentDefinitionHelper = presets.assortmentDefinitionHelper.default;
	const assortmentDefinitionUtilities = services.utils.assortmentDefinition.default.get(
		assortmentDefinitionHelper,
		assortmentFileHelper
	);

	const getAllShelves = new GetAllShelves(shelfRepository);
	const getAllAssortment = new GetAllAssortment(assortmentRepository, assortmentDefinitionUtilities);
	const updateShelf = new UpdateShelf(shelfHelper, shelfRepository);
	const storeWeightReading = new StoreWeightReading(shelfHelper, uuidManager, weightReadingRepository, shelfRepository);

	return new UpdateShelfWeightsTask(getAllShelves, getAllAssortment, shelfScale, updateShelf, storeWeightReading);
};
