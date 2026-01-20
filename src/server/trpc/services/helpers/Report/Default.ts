import { DefaultReportHelper } from "@/server/modules/reporting/application/helpers/ReportHelper";
import { ReportRepository } from "@/server/modules/reporting/domain/repositories/ReportRepository";
import { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import { DeleteFile } from "@/server/utils/files/application/use-cases/DeleteFile";
import { UUIDManager } from "@/server/utils";
import { GetServicesContext } from "../../context";

export const getDefaultReportHelper = (ctx: GetServicesContext) => {
	return {
		get: (
			uuidManager: UUIDManager,
			reportRepository: ReportRepository,
			uploadReportFile: UploadFile,
			deleteReportFile: DeleteFile,
		) => new DefaultReportHelper(uuidManager, reportRepository, uploadReportFile, deleteReportFile)
	};
};
