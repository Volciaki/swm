import { GetServicesContext } from "../context";
import { getAssortmentHelperServices } from "./Assortment";
import { getFileHelperServices } from "./File";
import { getShelfHelperServices } from "./Shelf";
import { getStorageAssortmentHelperServices } from "./StorageAssortment";

export const getHelpers = (ctx: GetServicesContext) => {
	return {
		shelf: getShelfHelperServices(ctx),
		assortment: getAssortmentHelperServices(ctx),
		storageAssortment: getStorageAssortmentHelperServices(ctx),
		file: getFileHelperServices(ctx),
	};
};

