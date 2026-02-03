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
import { DeleteFileByPath } from "@/server/utils/files/application/use-cases/DeleteFileByPath";
import type { StorageAssortmentDefinitionHelper } from "@/server/modules/storage/application/helpers/StorageAssortmentDefinitionHelper";
import { CreateAssortmentDefinition } from "@/server/modules/assortment/application/use-cases/CreateAssortmentDefinition";
import { GetAssortmentDefinition } from "@/server/modules/assortment/application/use-cases/GetAssortmentDefinition";
import { GetAllAssortmentDefinitions } from "@/server/modules/assortment/application/use-cases/GetAllAssortmentDefinitions";
import { DeleteAssortmentDefinition } from "@/server/modules/assortment/application/use-cases/DeleteAssortmentDefinition";
import type { Services } from "../../get";

export const getDefaultStorageAssortmentDefinitionHelperPreset = (
	services: Services
): StorageAssortmentDefinitionHelper => {
	const assortmentRepository = services.repositories.assortment.db;
	const shelfRepository = services.repositories.shelf.db;
	const uuidManager = services.utils.uuidManager.default;
	const qrCodeGenerator = services.utils.qrCodeGenerator.default;
	const fileReferenceRepository = services.repositories.fileReference.db;
	const shelfThermometer = services.utils.shelfThermometer.random;
	const encryptionManager = services.utils.encryptionManager.default;
	const assortmentDefinitionRepository = services.repositories.assortmentDefinition.db;

	const shelfHelper = services.helpers.shelf.default.get(shelfRepository, uuidManager, shelfThermometer);
	const assortmentHelper = services.helpers.assortment.default.get(assortmentRepository, uuidManager);
	const fileHelper = services.helpers.file.default.get(fileReferenceRepository, uuidManager);

	const getFileAction = new GetFile(fileHelper);

	const assortmentFileHelper = services.helpers.assortmentFile.default.get(getFileAction);
	const qrCodesFileStorage = services.utils.fileStorage.s3.get(S3FileStorageBucket.QR_CODES);
	const qrCodesFileManager = services.utils.fileManager.default.get(
		qrCodesFileStorage,
		fileReferenceRepository,
		fileHelper,
		encryptionManager
	);
	const assortmentImagesFileStorage = services.utils.fileStorage.s3.get(S3FileStorageBucket.ASSORTMENT_IMAGES);
	const assortmentImagesFileManager = services.utils.fileManager.default.get(
		assortmentImagesFileStorage,
		fileReferenceRepository,
		fileHelper,
		encryptionManager
	);

	const assortmentDefinitionHelper = services.helpers.assortmentDefinition.default.get(
		assortmentDefinitionRepository,
		uuidManager
	);
	const assortmentDefinitionUtilities = services.utils.assortmentDefinition.default.get(
		assortmentDefinitionHelper,
		assortmentFileHelper
	);

	const getAllAssortmentAction = new GetAllAssortment(assortmentRepository, assortmentDefinitionUtilities);
	const getAssortmentAction = new GetAssortment(assortmentHelper, assortmentDefinitionUtilities);
	const createAssortmentAction = new CreateAssortment(assortmentHelper, assortmentDefinitionUtilities);
	const deleteAssortmentAction = new DeleteAssortment(
		assortmentHelper,
		assortmentRepository,
		assortmentDefinitionUtilities
	);
	const getShelfAction = new GetShelf(shelfHelper);
	const fillCellAction = new FillCell(shelfRepository, shelfHelper);
	const emptyCellAction = new EmptyCell(shelfRepository, shelfHelper);

	const storageAssortmentHelper = services.helpers.storageAssortment.default.get(
		getAllAssortmentAction,
		getAssortmentAction,
		createAssortmentAction,
		deleteAssortmentAction,
		getShelfAction,
		fillCellAction,
		emptyCellAction
	);

	const getAssortmentDefinitionAction = new GetAssortmentDefinition(assortmentDefinitionHelper, assortmentFileHelper);
	const getAllAssortmentDefinitionsAction = new GetAllAssortmentDefinitions(
		assortmentDefinitionRepository,
		assortmentFileHelper
	);
	const createAssortmentDefinitionAction = new CreateAssortmentDefinition(assortmentDefinitionHelper);
	const deleteAssortmentDefinitionAction = new DeleteAssortmentDefinition(
		assortmentDefinitionHelper,
		assortmentFileHelper
	);
	const uploadFileProductImagesAction = new UploadFile(assortmentImagesFileManager);
	const uploadQRCodeFileAction = new UploadFile(qrCodesFileManager);
	const deleteFileProductImageAction = new DeleteFileByPath(fileHelper, assortmentImagesFileManager);
	const deleteFileQRCodeAction = new DeleteFileByPath(fileHelper, qrCodesFileManager);
	const fetchAssortmentImageFileAction = new FetchFile(fileHelper, assortmentImagesFileManager);
	const generateQRCodeAction = new GenerateQRCode(qrCodeGenerator);

	return services.helpers.storageAssortmentDefinition.default.get(
		storageAssortmentHelper,
		createAssortmentDefinitionAction,
		getAssortmentDefinitionAction,
		getAllAssortmentDefinitionsAction,
		getAllAssortmentAction,
		deleteAssortmentDefinitionAction,
		generateQRCodeAction,
		uploadFileProductImagesAction,
		uploadQRCodeFileAction,
		deleteFileProductImageAction,
		deleteFileQRCodeAction,
		fetchAssortmentImageFileAction
	);
};
