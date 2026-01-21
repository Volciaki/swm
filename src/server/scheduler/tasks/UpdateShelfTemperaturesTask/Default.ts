import { UpdateShelfTemperaturesTask } from "@/server/modules/warehouse/infrastructure/schedule/UpdateShelfTemperaturesTask";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { StoreTemperatureReading } from "@/server/modules/warehouse/application/use-cases/StoreTemperatureReading";
import { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import { UpdateShelf } from "@/server/modules/warehouse/application/use-cases/UpdateShelf";
import { GetServicesContext } from "@/server/trpc/services/context";
import { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import { getPresets, getServices } from "@/server/trpc/services";

export const getDefaultUpdateShelfTemperaturesPreset = (ctx: GetServicesContext) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const assortmentRepository = services.repositories.assortment.db;
	const fileHelper = presets.fileHelper.default;

	const getFileAction = new GetFile(fileHelper);

	const assortmentFileHelper = services.helpers.assortmentFile.default.get(getFileAction)
	const temperatureReadingRepository = services.repositories.temperatureReading.db;
	const shelfRepository = services.repositories.shelf.db;
	const shelfThermometer = services.utils.shelfThermometer.random;
	const uuidManager = services.utils.uuidManager.default;
	const shelfHelper = presets.shelfHelper.default;

	const getAllShelves = new GetAllShelves(shelfRepository);
	const getAllAssortment = new GetAllAssortment(assortmentRepository, assortmentFileHelper);
	const updateShelf = new UpdateShelf(shelfHelper, shelfRepository);
	const storeTemperatureReading = new StoreTemperatureReading(
		shelfHelper,
		uuidManager,
		temperatureReadingRepository,
		shelfRepository,
	);

	return new UpdateShelfTemperaturesTask(
		getAllShelves,
		getAllAssortment,
		shelfThermometer,
		updateShelf,
		storeTemperatureReading,
	);
};
