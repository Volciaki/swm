import { BackupSettingsHelper } from "@/server/modules/backup/application/helpers/BackupSettingsHelper";
import { Services } from "../../get";

export const getDefaultBackupSettingsHelperPreset = (services: Services): BackupSettingsHelper => {
	const uuidManager = services.utils.uuidManager.default;
	const backupSettingsRepository = services.repositories.backupSettings.db;

	return services.helpers.backupSettings.default.get(uuidManager, backupSettingsRepository);
}
