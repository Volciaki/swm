import type { GetServicesContext } from "../../context";
import { getDefaultDatabaseDataManager } from "./Default";

export const getDatabaseDataManagerServices = (ctx: GetServicesContext) => {
	return {
		default: getDefaultDatabaseDataManager(ctx),
	};
};
