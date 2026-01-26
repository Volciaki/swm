import { DefaultReportHelper } from "@/server/modules/reporting/application/helpers/ReportHelper";
import type { ReportRepository } from "@/server/modules/reporting/domain/repositories/ReportRepository";
import type { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import type { DeleteFile } from "@/server/utils/files/application/use-cases/DeleteFile";
import type { UUIDManager } from "@/server/utils";
import type { GetServicesContext } from "../../context";

export const getDefaultReportHelper = (ctx: GetServicesContext) => {
	return {
		get: (
			uuidManager: UUIDManager,
			reportRepository: ReportRepository,
			uploadReportFile: UploadFile,
			deleteReportFile: DeleteFile
		) => new DefaultReportHelper(uuidManager, reportRepository, uploadReportFile, deleteReportFile),
	};
};
