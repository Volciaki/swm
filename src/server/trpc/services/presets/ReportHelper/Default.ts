import { S3FileStorageBucket } from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import { ReportHelper } from "@/server/modules/reporting/application/helpers/ReportHelper";
import { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import { DeleteFile } from "@/server/utils/files/application/use-cases/DeleteFile";
import { Services } from "../../get";

export const getDefaultReportHelperPreset = (services: Services): ReportHelper => {
	const uuidManager = services.utils.uuidManager.default;
	const reportRepository = services.repositories.report.db;

	const fileStorage = services.utils.fileStorage.s3.get(S3FileStorageBucket.REPORTS);
	const fileReferenceRepository = services.repositories.fileReference.db;
	const fileHelper = services.helpers.file.default.get(fileReferenceRepository, uuidManager);
	const fileManager = services.utils.fileManager.default.get(fileStorage, fileReferenceRepository, fileHelper);

	const uploadFileAction = new UploadFile(fileManager);
	const deleteFileAction = new DeleteFile(fileHelper, fileManager);
	
	return services.helpers.report.default.get(uuidManager, reportRepository, uploadFileAction, deleteFileAction);
}
