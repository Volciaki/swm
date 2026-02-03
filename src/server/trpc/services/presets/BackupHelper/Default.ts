import { S3FileStorageBucket } from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import type { BackupHelper } from "@/server/modules/backup/application/helpers/BackupHelper";
import { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAllReports } from "@/server/modules/reporting/application/use-cases/GetAllReports";
import { DeleteFile } from "@/server/utils/files/application/use-cases/DeleteFile";
import { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import type { Services } from "../../get";

export const getDefaultBackupHelperPreset = (services: Services): BackupHelper => {
	const fileReferenceRepository = services.repositories.fileReference.db;
	const uuidManager = services.utils.uuidManager.default;
	const fileHelper = services.helpers.file.default.get(fileReferenceRepository, uuidManager);
	const encryptionManager = services.utils.encryptionManager.default;

	const reportFileStorage = services.utils.fileStorage.s3.get(S3FileStorageBucket.REPORTS);
	const reportFileManager = services.utils.fileManager.default.get(
		reportFileStorage,
		fileReferenceRepository,
		fileHelper,
		encryptionManager
	);

	const backupsFileStorage = services.utils.fileStorage.s3.get(S3FileStorageBucket.BACKUPS);
	const backupsFileManager = services.utils.fileManager.default.get(
		backupsFileStorage,
		fileReferenceRepository,
		fileHelper,
		encryptionManager
	);

	const assortmentImageFileStorage = services.utils.fileStorage.s3.get(S3FileStorageBucket.ASSORTMENT_IMAGES);
	const assortmentImageFileManager = services.utils.fileManager.default.get(
		assortmentImageFileStorage,
		fileReferenceRepository,
		fileHelper,
		encryptionManager
	);

	const qrCodeFileStorage = services.utils.fileStorage.s3.get(S3FileStorageBucket.QR_CODES);
	const qrCodeFileManager = services.utils.fileManager.default.get(
		qrCodeFileStorage,
		fileReferenceRepository,
		fileHelper,
		encryptionManager
	);

	const getFile = new GetFile(fileHelper);

	const assortmentFileHelper = services.helpers.assortmentFile.default.get(getFile);
	const assortmentRepository = services.repositories.assortment.db;
	const reportRepository = services.repositories.report.db;
	const backupRepository = services.repositories.backup.db;
	const assortmentDefinitionRepository = services.repositories.assortmentDefinition.db;
	const assortmentDefinitionHelper = services.helpers.assortmentDefinition.default.get(
		assortmentDefinitionRepository,
		uuidManager
	);
	const assortmentDefinitionUtilities = services.utils.assortmentDefinition.default.get(
		assortmentDefinitionHelper,
		assortmentFileHelper
	);

	const getAllAssortment = new GetAllAssortment(assortmentRepository, assortmentDefinitionUtilities);
	const getAllReports = new GetAllReports(reportRepository, getFile);
	const fetchAssortmentImageFile = new FetchFile(fileHelper, assortmentImageFileManager);
	const fetchAssortmentQRCodeFile = new FetchFile(fileHelper, qrCodeFileManager);
	const fetchReportFile = new FetchFile(fileHelper, reportFileManager);
	const uploadAssortmentImageFile = new UploadFile(assortmentImageFileManager);
	const uploadAssortmentQRCodeFile = new UploadFile(qrCodeFileManager);
	const uploadReportFile = new UploadFile(reportFileManager);
	const deleteAssortmentImageFile = new DeleteFile(fileHelper, assortmentImageFileManager);
	const deleteAssortmentQRCodeFile = new DeleteFile(fileHelper, qrCodeFileManager);
	const deleteReportFile = new DeleteFile(fileHelper, reportFileManager);

	const fileStorageDataManager = services.utils.fileStorageDataManager.default.get(
		getAllAssortment,
		getAllReports,
		getFile,
		fetchAssortmentImageFile,
		fetchAssortmentQRCodeFile,
		fetchReportFile,
		uploadAssortmentImageFile,
		uploadAssortmentQRCodeFile,
		uploadReportFile,
		deleteAssortmentImageFile,
		deleteAssortmentQRCodeFile,
		deleteReportFile
	);
	const databaseDataManager = services.utils.databaseDataManager.default;
	const uploadBackupFile = new UploadFile(backupsFileManager);
	const fetchBackupFile = new FetchFile(fileHelper, backupsFileManager);

	return services.helpers.backup.default.get(
		fileStorageDataManager,
		databaseDataManager,
		uploadBackupFile,
		uuidManager,
		backupRepository,
		getFile,
		fetchBackupFile
	);
};
