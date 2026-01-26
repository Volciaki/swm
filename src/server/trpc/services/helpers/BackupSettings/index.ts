import type { GetServicesContext } from "../../context";
import { getDefaultBackupSettingsHelper } from "./Default";

export const getBackupSettingsHelperServices = (ctx: GetServicesContext) => {
	return {
		default: getDefaultBackupSettingsHelper(ctx),
	};
};
