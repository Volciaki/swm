import { DefaultBackupHelper } from "@/server/modules/backup/application/helpers/BackupHelper";
import { FileStorageDataManager } from "@/server/modules/backup/application/services/FileStorageDataManager";
import { BackupRepository } from "@/server/modules/backup/domain/repositories/BackupRepository";
import { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import { UUIDManager } from "@/server/utils";
import { GetServicesContext } from "../../context";

export const getDefaultBackupHelper = (ctx: GetServicesContext) => {
	return {
		get: (
			fileStorageDataManager: FileStorageDataManager,
			uploadBackupFile: UploadFile,
			uuidManager: UUIDManager,
			backupRepository: BackupRepository,
		) => new DefaultBackupHelper(
			fileStorageDataManager,
			uploadBackupFile,
			uuidManager,
			backupRepository,
		),
	};
};
