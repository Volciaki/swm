import { DefaultStorageAssortmentHelper } from "@/server/modules/storage/application/helpers/StorageAssortmentHelper";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { CreateAssortment } from "@/server/modules/assortment/application/use-cases/CreateAssortment";
import { DeleteAssortment } from "@/server/modules/assortment/application/use-cases/DeleteAssortment";
import { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import { FillCell } from "@/server/modules/warehouse/application/use-cases/FillCell";
import { EmptyCell } from "@/server/modules/warehouse/application/use-cases/EmptyCell";
import { GenerateQRCode } from "@/server/utils/qr-codes/application/use-cases/GenerateQRCode";
import { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import { GetServicesContext } from "../../context";

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
			uploadFileProductImages: UploadFile,
			uploadFileQRCodes: UploadFile,
			fetchFile: FetchFile,
		) => new DefaultStorageAssortmentHelper(
			getAllAssortment,
			getAssortment,
			createAssortment,
			deleteAssortment,
			getShelf,
			fillCell,
			emptyCell,
			generateQRCode,
			uploadFileProductImages,
			uploadFileQRCodes,
			fetchFile,
		)
	};
};
