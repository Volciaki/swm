import { DefaultFileStorageDataManager } from "@/server/modules/backup/infrastructure/services/DefaultFileStorageDataManager";
import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { GetAllReports } from "@/server/modules/reporting/application/use-cases/GetAllReports";
import type { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import type { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import type { DeleteFile } from "@/server/utils/files/application/use-cases/DeleteFile";
import type { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import type { GetServicesContext } from "../../context";

export const getDefaultFileStorageDataManager = (ctx: GetServicesContext) => {
	return {
		get: (
			getAllAssortment: GetAllAssortment,
			getAllReports: GetAllReports,
			getFile: GetFile,
			fetchAssortmentImageFile: FetchFile,
			fetchAssortmentQRCodeFile: FetchFile,
			fetchReportFile: FetchFile,
			uploadAssortmentImageFile: UploadFile,
			uploadAssortmentQRCodeFile: UploadFile,
			uploadReportFile: UploadFile,
			deleteAssortmentImageFile: DeleteFile,
			deleteAssortmentQRCodeFile: DeleteFile,
			deleteReportFile: DeleteFile
		) =>
			new DefaultFileStorageDataManager(
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
			),
	};
};
