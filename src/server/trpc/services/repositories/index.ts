import type { GetServicesContext } from "../context";

import { getUserRepositories } from "./User";
import { getTwoFactorAuthenticationSessionRepositories } from "./TwoFactorAuthenticationSession";
import { getShelfRepositories } from "./Shelf";
import { getAssortmentRepositories } from "./Assortment";
import { getFileReferenceRepositories } from "./FileReference";
import { getNotificationRepositories } from "./Notification";
import { getTemperatureReadingRepositories } from "./TemperatureReading";
import { getReportRepositories } from "./Report";
import { getBackupRepositories } from "./Backup";
import { getBackupSettingsRepositories } from "./BackupSettings";
import { getAssortmentDefinitionRepositories } from "./AssortmentDefinition";

export const getRepositories = (ctx: GetServicesContext) => {
	return {
		user: getUserRepositories(ctx),
		twoFactorAuthenticationSession: getTwoFactorAuthenticationSessionRepositories(ctx),
		shelf: getShelfRepositories(ctx),
		assortment: getAssortmentRepositories(ctx),
		fileReference: getFileReferenceRepositories(ctx),
		notification: getNotificationRepositories(ctx),
		temperatureReading: getTemperatureReadingRepositories(ctx),
		report: getReportRepositories(ctx),
		backup: getBackupRepositories(ctx),
		backupSettings: getBackupSettingsRepositories(ctx),
		assortmentDefinition: getAssortmentDefinitionRepositories(ctx),
	};
};
