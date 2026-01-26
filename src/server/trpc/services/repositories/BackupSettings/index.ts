import type { GetServicesContext } from "../../context";
import { getDBBackupSettingsRepository } from "./DB";

export const getBackupSettingsRepositories = (ctx: GetServicesContext) => {
	return {
		db: getDBBackupSettingsRepository(ctx),
	};
};
