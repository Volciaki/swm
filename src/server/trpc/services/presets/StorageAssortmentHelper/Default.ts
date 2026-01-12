import { StorageAssortmentHelper } from "@/server/modules/storage/application/helpers/StorageAssortmentHelper";
import { Services } from "../../get";
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

export const getDefaultStorageAssortmentHelperPreset = (services: Services): StorageAssortmentHelper => {
	const assortmentRepository = services.repositories.assortment.db;
	const shelfRepository = services.repositories.shelf.db;
	const uuidManager = services.utils.uuidManager.default;
	const qrCodeGenerator = services.utils.qrCodeGenerator.default;

	const shelfHelper = services.helpers.shelf.default.get(shelfRepository, uuidManager);
	const assortmentHelper = services.helpers.assortment.default.get(assortmentRepository, uuidManager);

	const fileStorage = services.utils.fileStorage.s3.get(S3FileStorageBucket.QR_CODES);
	const fileReferenceRepository = services.repositories.fileReference.db;
	const fileHelper = services.helpers.file.default.get(fileReferenceRepository, uuidManager);
	const fileManager = services.utils.fileManager.default.get(fileStorage, fileReferenceRepository, fileHelper);

	const getAllAssortmentAction = new GetAllAssortment(assortmentRepository);
	const getAssortmentAction = new GetAssortment(assortmentHelper);
	const createAssortmentAction = new CreateAssortment(assortmentHelper);
	const deleteAssortmentAction = new DeleteAssortment(assortmentRepository, assortmentHelper);
	const getShelfAction = new GetShelf(shelfHelper);
	const fillCellAction = new FillCell(shelfRepository, shelfHelper);
	const emptyCellAction = new EmptyCell(shelfRepository, shelfHelper);
	const generateQRCodeAction = new GenerateQRCode(qrCodeGenerator);
	const uploadFileAction = new UploadFile(fileManager);

	return services.helpers.storageAssortment.default.get(
		getAllAssortmentAction,
		getAssortmentAction,
		createAssortmentAction,
		deleteAssortmentAction,
		getShelfAction,
		fillCellAction,
		emptyCellAction,
		generateQRCodeAction,
		uploadFileAction,
	);
}
