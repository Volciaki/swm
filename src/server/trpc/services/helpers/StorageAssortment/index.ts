import type { GetServicesContext } from "../../context";
import { getDefaultStorageAssortmentHelper } from "./Default";

export const getStorageAssortmentHelperServices = (ctx: GetServicesContext) => {
	return {
		default: getDefaultStorageAssortmentHelper(ctx),
	};
};
