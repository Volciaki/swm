import { ShelfHelper } from "@/server/modules/warehouse/application/helpers/ShelfHelper";
import { Services } from "../../get";

export const getDefaultShelfHelperPreset = (services: Services): ShelfHelper => {
	const shelfRepository = services.repositories.shelf.db;
	const uuidManager = services.utils.uuidManager.default;
	
	return services.helpers.shelf.default.get(shelfRepository, uuidManager);
}
