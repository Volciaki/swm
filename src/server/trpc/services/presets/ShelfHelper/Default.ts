import type { ShelfHelper } from "@/server/modules/warehouse/application/helpers/ShelfHelper";
import type { Services } from "../../get";

export const getDefaultShelfHelperPreset = (services: Services): ShelfHelper => {
	const shelfRepository = services.repositories.shelf.db;
	const uuidManager = services.utils.uuidManager.default;
	const shelfThermometer = services.utils.shelfThermometer.random;

	return services.helpers.shelf.default.get(shelfRepository, uuidManager, shelfThermometer);
};
