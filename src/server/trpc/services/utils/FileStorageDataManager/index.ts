import type { GetServicesContext } from "../../context";
import { getDefaultFileStorageDataManager } from "./Default";

export const getFileStorageDataManagerServices = (ctx: GetServicesContext) => {
	return {
		default: getDefaultFileStorageDataManager(ctx),
	};
};
