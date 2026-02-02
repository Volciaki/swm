import type { GetServicesContext } from "../../context";
import { getDefaultStorageShelfHelper } from "./Default";

export const getStorageShelfHelperServices = (ctx: GetServicesContext) => {
	return {
		default: getDefaultStorageShelfHelper(ctx),
	};
};
