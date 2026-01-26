import type { GetServicesContext } from "../context";

import { getAssortmentHelperServices } from "./Assortment";
import { getFileHelperServices } from "./File";
import { getShelfHelperServices } from "./Shelf";
import { getStorageAssortmentHelperServices } from "./StorageAssortment";
import { getAssortmentFileHelperServices } from "./AssortmentFile";
import { getReportHelperServices } from "./Report";
import { getBackupHelperServices } from "./Backup";
import { getBackupSettingsHelperServices } from "./BackupSettings";

export const getHelpers = (ctx: GetServicesContext) => {
	return {
		shelf: getShelfHelperServices(ctx),
		assortment: getAssortmentHelperServices(ctx),
		storageAssortment: getStorageAssortmentHelperServices(ctx),
		file: getFileHelperServices(ctx),
		assortmentFile: getAssortmentFileHelperServices(ctx),
		report: getReportHelperServices(ctx),
		backup: getBackupHelperServices(ctx),
		backupSettings: getBackupSettingsHelperServices(ctx),
	};
};
