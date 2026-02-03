import type { GetServicesContext } from "../context";

import { getAssortmentHelperServices } from "./Assortment";
import { getFileHelperServices } from "./File";
import { getShelfHelperServices } from "./Shelf";
import { getStorageAssortmentHelperServices } from "./StorageAssortment";
import { getAssortmentFileHelperServices } from "./AssortmentFile";
import { getReportHelperServices } from "./Report";
import { getBackupHelperServices } from "./Backup";
import { getBackupSettingsHelperServices } from "./BackupSettings";
import { getAssortmentDefinitionHelperServices } from "./AssortmentDefinitionHelper";
import { getStorageAssortmentDefinitionHelperServices } from "./StorageAssortmentDefinitionHelper";
import { getStorageShelfHelperServices } from "./StorageShelf";

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
		assortmentDefinition: getAssortmentDefinitionHelperServices(ctx),
		storageAssortmentDefinition: getStorageAssortmentDefinitionHelperServices(ctx),
		storageShelf: getStorageShelfHelperServices(ctx),
	};
};
