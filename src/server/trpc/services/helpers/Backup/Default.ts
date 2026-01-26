import type { FileStorageDataManager } from "@/server/modules/backup/application/services/FileStorageDataManager";
import type { DatabaseDataManager } from "@/server/modules/backup/application/services/DatabaseDataManager";
import type { BackupRepository } from "@/server/modules/backup/domain/repositories/BackupRepository";
import { DefaultBackupHelper } from "@/server/modules/backup/application/helpers/BackupHelper";
import type { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import type { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import type { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import type { UUIDManager } from "@/server/utils";
import type { GetServicesContext } from "../../context";

export const getDefaultBackupHelper = (ctx: GetServicesContext) => {
	return {
		get: (
			fileStorageDataManager: FileStorageDataManager,
			databaseDataManager: DatabaseDataManager,
			uploadBackupFile: UploadFile,
			uuidManager: UUIDManager,
			backupRepository: BackupRepository,
			getFile: GetFile,
			fetchBackupFile: FetchFile
		) =>
			new DefaultBackupHelper(
				fileStorageDataManager,
				databaseDataManager,
				uploadBackupFile,
				uuidManager,
				backupRepository,
				getFile,
				fetchBackupFile
			),
	};
};
