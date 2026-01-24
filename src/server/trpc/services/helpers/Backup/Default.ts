import { FileStorageDataManager } from "@/server/modules/backup/application/services/FileStorageDataManager";
import { DatabaseDataManager } from "@/server/modules/backup/application/services/DatabaseDataManager";
import { BackupRepository } from "@/server/modules/backup/domain/repositories/BackupRepository";
import { DefaultBackupHelper } from "@/server/modules/backup/application/helpers/BackupHelper";
import { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import { UUIDManager } from "@/server/utils";
import { GetServicesContext } from "../../context";

export const getDefaultBackupHelper = (ctx: GetServicesContext) => {
	return {
		get: (
			fileStorageDataManager: FileStorageDataManager,
			databaseDataManager: DatabaseDataManager,
			uploadBackupFile: UploadFile,
			uuidManager: UUIDManager,
			backupRepository: BackupRepository,
			getFile: GetFile,
		) => new DefaultBackupHelper(
			fileStorageDataManager,
			databaseDataManager,
			uploadBackupFile,
			uuidManager,
			backupRepository,
			getFile,
		),
	};
};
