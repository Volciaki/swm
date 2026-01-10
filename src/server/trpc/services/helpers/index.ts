import { GetServicesContext } from "../context";
import { getAssortmentHelperServices } from "./Assortment";
import { getShelfHelperServices } from "./Shelf";
import { getStorageAssortmentHelperServices } from "./StorageAssortment";

export const getHelpers = (ctx: GetServicesContext) => {
	return {
		shelf: getShelfHelperServices(ctx),
		assortment: getAssortmentHelperServices(ctx),
		storageAssortment: getStorageAssortmentHelperServices(ctx),
	};
};

