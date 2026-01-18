import { Services } from "../../get";
import { AssortmentHelper } from "@/server/modules/assortment/application/helpers/AssortmentHelper";

export const getDefaultAssortmentHelperPreset = (services: Services): AssortmentHelper => {
	const assortmentRepository = services.repositories.assortment.db;
	const uuidManager = services.utils.uuidManager.default;
	
	return services.helpers.assortment.default.get(assortmentRepository, uuidManager);
}
