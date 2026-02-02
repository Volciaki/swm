import type { StorageAssortmentHelper } from "@/server/modules/storage/application/helpers/StorageAssortmentHelper";
import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { GenerateQRCode } from "@/server/utils/qr-codes/application/use-cases/GenerateQRCode";
import type { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import type { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import type { DeleteFileByPath } from "@/server/utils/files/application/use-cases/DeleteFileByPath";
import { DefaultStorageAssortmentDefinitionHelper } from "@/server/modules/storage/application/helpers/StorageAssortmentDefinitionHelper";
import type { CreateAssortmentDefinition } from "@/server/modules/assortment/application/use-cases/CreateAssortmentDefinition";
import type { DeleteAssortmentDefinition } from "@/server/modules/assortment/application/use-cases/DeleteAssortmentDefinition";
import type { GetAllAssortmentDefinitions } from "@/server/modules/assortment/application/use-cases/GetAllAssortmentDefinitions";
import type { GetAssortmentDefinition } from "@/server/modules/assortment/application/use-cases/GetAssortmentDefinition";
import type { GetServicesContext } from "../../context";

export const getDefaultStorageAssortmentDefinitionHelper = (ctx: GetServicesContext) => {
	return {
		get: (
			storageAssortmentHelper: StorageAssortmentHelper,
			createAssortmentDefinition: CreateAssortmentDefinition,
			getAssortmentDefinition: GetAssortmentDefinition,
			getAllAssortmentDefinitions: GetAllAssortmentDefinitions,
			getAllAssortment: GetAllAssortment,
			deleteAssortmentDefinition: DeleteAssortmentDefinition,
			generateQRCode: GenerateQRCode,
			uploadFileProductImages: UploadFile,
			uploadFileQRCodes: UploadFile,
			deleteFileProductImage: DeleteFileByPath,
			deleteFileQRCode: DeleteFileByPath,
			fetchFileProductImage: FetchFile
		) =>
			new DefaultStorageAssortmentDefinitionHelper(
				storageAssortmentHelper,
				createAssortmentDefinition,
				getAssortmentDefinition,
				getAllAssortmentDefinitions,
				getAllAssortment,
				deleteAssortmentDefinition,
				generateQRCode,
				uploadFileProductImages,
				uploadFileQRCodes,
				deleteFileProductImage,
				deleteFileQRCode,
				fetchFileProductImage
			),
	};
};
