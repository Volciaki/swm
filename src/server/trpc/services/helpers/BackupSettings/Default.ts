import { DefaultBackupSettingsHelper } from "@/server/modules/backup/application/helpers/BackupSettingsHelper";
import { BackupSettingsRepository } from "@/server/modules/backup/domain/repositories/BackupSettingsRepository";
import { UUIDManager } from "@/server/utils";
import { GetServicesContext } from "../../context";

export const getDefaultBackupSettingsHelper = (ctx: GetServicesContext) => {
	return {
		get: (
			uuidManager: UUIDManager,
			backupSettingsRepository: BackupSettingsRepository,
		) => new DefaultBackupSettingsHelper(
			uuidManager,
			backupSettingsRepository,
		),
	};
};
