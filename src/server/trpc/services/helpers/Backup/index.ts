import type { GetServicesContext } from "../../context";
import { getDefaultBackupHelper } from "./Default";

export const getBackupHelperServices = (ctx: GetServicesContext) => {
	return {
		default: getDefaultBackupHelper(ctx),
	};
};
