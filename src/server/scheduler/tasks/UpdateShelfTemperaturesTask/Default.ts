import { UpdateShelfTemperaturesTask } from "@/server/modules/warehouse/infrastructure/schedule/UpdateShelfTemperaturesTask";
import { StoreTemperatureReading } from "@/server/modules/warehouse/application/use-cases/StoreTemperatureReading";
import { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import { UpdateShelf } from "@/server/modules/warehouse/application/use-cases/UpdateShelf";
import { GetServicesContext } from "@/server/trpc/services/context";
import { getPresets, getServices } from "@/server/trpc/services";

export const getDefaultUpdateShelfTemperaturesPreset = (ctx: GetServicesContext) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const temperatureReadingRepository = services.repositories.temperatureReading.db;
	const shelfRepository = services.repositories.shelf.db;
	const shelfThermometer = services.utils.shelfThermometer.random;
	const uuidManager = services.utils.uuidManager.default;
	const shelfHelper = presets.shelfHelper.default;

	const getAllShelves = new GetAllShelves(shelfRepository);
	const updateShelf = new UpdateShelf(shelfHelper, shelfRepository);
	const storeTemperatureReading = new StoreTemperatureReading(
		shelfHelper,
		uuidManager,
		temperatureReadingRepository,
		shelfRepository,
	);

	return new UpdateShelfTemperaturesTask(
		getAllShelves,
		shelfThermometer,
		updateShelf,
		storeTemperatureReading,
	);
};
