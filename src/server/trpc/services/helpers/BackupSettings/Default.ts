import { DefaultBackupSettingsHelper } from "@/server/modules/backup/application/helpers/BackupSettingsHelper";
import type { BackupSettingsRepository } from "@/server/modules/backup/domain/repositories/BackupSettingsRepository";
import type { UUIDManager } from "@/server/utils";
import type { GetServicesContext } from "../../context";

export const getDefaultBackupSettingsHelper = (ctx: GetServicesContext) => {
	return {
		get: (uuidManager: UUIDManager, backupSettingsRepository: BackupSettingsRepository) =>
			new DefaultBackupSettingsHelper(uuidManager, backupSettingsRepository),
	};
};
