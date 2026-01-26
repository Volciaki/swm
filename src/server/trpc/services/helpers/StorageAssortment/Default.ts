import { DefaultStorageAssortmentHelper } from "@/server/modules/storage/application/helpers/StorageAssortmentHelper";
import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import type { CreateAssortment } from "@/server/modules/assortment/application/use-cases/CreateAssortment";
import type { DeleteAssortment } from "@/server/modules/assortment/application/use-cases/DeleteAssortment";
import type { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import type { FillCell } from "@/server/modules/warehouse/application/use-cases/FillCell";
import type { EmptyCell } from "@/server/modules/warehouse/application/use-cases/EmptyCell";
import type { GenerateQRCode } from "@/server/utils/qr-codes/application/use-cases/GenerateQRCode";
import type { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import type { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import type { DeleteFileByPath } from "@/server/utils/files/application/use-cases/DeleteFileByPath";
import type { GetServicesContext } from "../../context";

export const getDefaultStorageAssortmentHelper = (ctx: GetServicesContext) => {
	return {
		get: (
			getAllAssortment: GetAllAssortment,
			getAssortment: GetAssortment,
			createAssortment: CreateAssortment,
			deleteAssortment: DeleteAssortment,
			getShelf: GetShelf,
			fillCell: FillCell,
			emptyCell: EmptyCell,
			generateQRCode: GenerateQRCode,
			uploadFileProductImage: UploadFile,
			uploadFileQRCode: UploadFile,
			deleteFileProductImage: DeleteFileByPath,
			deleteFileQRCode: DeleteFileByPath,
			fetchFileProductImage: FetchFile
		) =>
			new DefaultStorageAssortmentHelper(
				getAllAssortment,
				getAssortment,
				createAssortment,
				deleteAssortment,
				getShelf,
				fillCell,
				emptyCell,
				generateQRCode,
				uploadFileProductImage,
				uploadFileQRCode,
				deleteFileProductImage,
				deleteFileQRCode,
				fetchFileProductImage
			),
	};
};
