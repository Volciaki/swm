import { StorageAssortmentHelper } from "@/server/modules/storage/application/helpers/StorageAssortmentHelper";
import { S3FileStorageBucket } from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { CreateAssortment } from "@/server/modules/assortment/application/use-cases/CreateAssortment";
import { DeleteAssortment } from "@/server/modules/assortment/application/use-cases/DeleteAssortment";
import { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import { FillCell } from "@/server/modules/warehouse/application/use-cases/FillCell";
import { EmptyCell } from "@/server/modules/warehouse/application/use-cases/EmptyCell";
import { GenerateQRCode } from "@/server/utils/qr-codes/application/use-cases/GenerateQRCode";
import { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import { Services } from "../../get";
import { DeleteFileByPath } from "@/server/utils/files/application/use-cases/DeleteFileByPath";

export const getDefaultStorageAssortmentHelperPreset = (services: Services): StorageAssortmentHelper => {
	const assortmentRepository = services.repositories.assortment.db;
	const shelfRepository = services.repositories.shelf.db;
	const uuidManager = services.utils.uuidManager.default;
	const qrCodeGenerator = services.utils.qrCodeGenerator.default;
	const fileReferenceRepository = services.repositories.fileReference.db;

	const shelfHelper = services.helpers.shelf.default.get(shelfRepository, uuidManager);
	const assortmentHelper = services.helpers.assortment.default.get(assortmentRepository, uuidManager);
	const fileHelper = services.helpers.file.default.get(fileReferenceRepository, uuidManager);

	const getFileAction = new GetFile(fileHelper);

	const assortmentFileHelper = services.helpers.assortmentFile.default.get(getFileAction);
	const qrCodesFileStorage = services.utils.fileStorage.s3.get(S3FileStorageBucket.QR_CODES);
	const qrCodesFileManager = services.utils.fileManager.default.get(qrCodesFileStorage, fileReferenceRepository, fileHelper);
	const assortmentImagesFileStorage = services.utils.fileStorage.s3.get(S3FileStorageBucket.ASSORTMENT_IMAGES);
	const assortmentImagesFileManager = services.utils.fileManager.default.get(assortmentImagesFileStorage, fileReferenceRepository, fileHelper);

	const getAllAssortmentAction = new GetAllAssortment(assortmentRepository, assortmentFileHelper);
	const getAssortmentAction = new GetAssortment(assortmentHelper, assortmentFileHelper);
	const createAssortmentAction = new CreateAssortment(assortmentHelper);
	const deleteAssortmentAction = new DeleteAssortment(assortmentHelper, assortmentFileHelper);
	const getShelfAction = new GetShelf(shelfHelper);
	const fillCellAction = new FillCell(shelfRepository, shelfHelper);
	const emptyCellAction = new EmptyCell(shelfRepository, shelfHelper);
	const generateQRCodeAction = new GenerateQRCode(qrCodeGenerator);
	const uploadQRCodeFileAction = new UploadFile(qrCodesFileManager);
	const uploadAssortmentImageFileAction = new UploadFile(assortmentImagesFileManager);
	const deleteFileQRCode = new DeleteFileByPath(fileHelper, qrCodesFileManager);
	const deleteAssortmentImageFileAction = new DeleteFileByPath(fileHelper, assortmentImagesFileManager);
	const fetchAssortmentImageFileAction = new FetchFile(fileHelper, assortmentImagesFileManager);

	return services.helpers.storageAssortment.default.get(
		getAllAssortmentAction,
		getAssortmentAction,
		createAssortmentAction,
		deleteAssortmentAction,
		getShelfAction,
		fillCellAction,
		emptyCellAction,
		generateQRCodeAction,
		uploadAssortmentImageFileAction,
		uploadQRCodeFileAction,
		deleteAssortmentImageFileAction,
		deleteFileQRCode,
		fetchAssortmentImageFileAction,
	);
}
