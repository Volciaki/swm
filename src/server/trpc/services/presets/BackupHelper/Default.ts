import { S3FileStorageBucket } from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import { BackupHelper } from "@/server/modules/backup/application/helpers/BackupHelper";
import { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import { Services } from "../../get";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAllReports } from "@/server/modules/reporting/application/use-cases/GetAllReports";
import { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";

export const getDefaultBackupHelperPreset = (services: Services): BackupHelper => {
	const fileReferenceRepository = services.repositories.fileReference.db;
	const uuidManager = services.utils.uuidManager.default;
	const fileHelper = services.helpers.file.default.get(fileReferenceRepository, uuidManager);

	const reportFileStorage = services.utils.fileStorage.s3.get(S3FileStorageBucket.REPORTS);
	const reportFileManager = services.utils.fileManager.default.get(reportFileStorage, fileReferenceRepository, fileHelper);

	const backupsFileStorage = services.utils.fileStorage.s3.get(S3FileStorageBucket.BACKUPS);
	const backupsFileManager = services.utils.fileManager.default.get(backupsFileStorage, fileReferenceRepository, fileHelper);

	const assortmentImageFileStorage = services.utils.fileStorage.s3.get(S3FileStorageBucket.ASSORTMENT_IMAGES);
	const assortmentImageFileManager = services.utils.fileManager.default.get(assortmentImageFileStorage, fileReferenceRepository, fileHelper);

	const qrCodeFileStorage = services.utils.fileStorage.s3.get(S3FileStorageBucket.QR_CODES);
	const qrCodeFileManager = services.utils.fileManager.default.get(qrCodeFileStorage, fileReferenceRepository, fileHelper);

	const getFile = new GetFile(fileHelper);

	const assortmentFileHelper = services.helpers.assortmentFile.default.get(getFile);
	const assortmentRepository = services.repositories.assortment.db;
	const reportRepository = services.repositories.report.db;
	const backupRepository = services.repositories.backup.db;

	const getAllAssortment = new GetAllAssortment(assortmentRepository, assortmentFileHelper);
	const getAllReports = new GetAllReports(reportRepository, getFile);
	const fetchAssortmentImageFile = new FetchFile(fileHelper, assortmentImageFileManager);
	const fetchAssortmentQRCodeFile = new FetchFile(fileHelper, qrCodeFileManager);
	const fetchReportFile = new FetchFile(fileHelper, reportFileManager);

	const fileStorageDataManager = services.utils.fileStorageDataManager.default.get(
		getAllAssortment,
		getAllReports,
		getFile,
		fetchAssortmentImageFile,
		fetchAssortmentQRCodeFile,
		fetchReportFile,
	);
	const databaseDataManager = services.utils.databaseDataManager.default;
	const uploadBackupFile = new UploadFile(backupsFileManager);
	
	return services.helpers.backup.default.get(fileStorageDataManager, databaseDataManager, uploadBackupFile, uuidManager, backupRepository, getFile);
}
