import type { StorageAssortmentHelper } from "@/server/modules/storage/application/helpers/StorageAssortmentHelper";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { CreateAssortment } from "@/server/modules/assortment/application/use-cases/CreateAssortment";
import { DeleteAssortment } from "@/server/modules/assortment/application/use-cases/DeleteAssortment";
import { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import { FillCell } from "@/server/modules/warehouse/application/use-cases/FillCell";
import { EmptyCell } from "@/server/modules/warehouse/application/use-cases/EmptyCell";
import { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import type { Services } from "../../get";

export const getDefaultStorageAssortmentHelperPreset = (services: Services): StorageAssortmentHelper => {
	const assortmentRepository = services.repositories.assortment.db;
	const shelfRepository = services.repositories.shelf.db;
	const uuidManager = services.utils.uuidManager.default;
	const fileReferenceRepository = services.repositories.fileReference.db;
	const shelfThermometer = services.utils.shelfThermometer.random;
	const assortmentDefinitionRepository = services.repositories.assortmentDefinition.db;

	const shelfHelper = services.helpers.shelf.default.get(shelfRepository, uuidManager, shelfThermometer);
	const assortmentHelper = services.helpers.assortment.default.get(assortmentRepository, uuidManager);
	const fileHelper = services.helpers.file.default.get(fileReferenceRepository, uuidManager);

	const getFileAction = new GetFile(fileHelper);

	const assortmentFileHelper = services.helpers.assortmentFile.default.get(getFileAction);
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

	return services.helpers.storageAssortment.default.get(
		getAllAssortmentAction,
		getAssortmentAction,
		createAssortmentAction,
		deleteAssortmentAction,
		getShelfAction,
		fillCellAction,
		emptyCellAction
	);
};
