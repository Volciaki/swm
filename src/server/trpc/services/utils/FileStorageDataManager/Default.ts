import { DefaultFileStorageDataManager } from "@/server/modules/backup/infrastructure/services/DefaultFileStorageDataManager";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAllReports } from "@/server/modules/reporting/application/use-cases/GetAllReports";
import { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import { GetServicesContext } from "../../context";

export const getDefaultFileStorageDataManager = (ctx: GetServicesContext) => {
	return {
		get: (
			getAllAssortment: GetAllAssortment,
			getAllReports: GetAllReports,
			getFile: GetFile,
			fetchAssortmentImageFile: FetchFile,
			fetchAssortmentQRCodeFile: FetchFile,
			fetchReportFile: FetchFile,
		) => new DefaultFileStorageDataManager(
			getAllAssortment,
			getAllReports,
			getFile,
			fetchAssortmentImageFile,
			fetchAssortmentQRCodeFile,
			fetchReportFile,
		),
	};
}
