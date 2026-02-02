import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { ValidateShelf } from "@/server/modules/warehouse/application/use-cases/ValidateShelf";
import { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import { DeleteFileByPath } from "@/server/utils/files/application/use-cases/DeleteFileByPath";
import { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import { S3FileStorageBucket } from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import { RefreshShelfLegalWeight } from "@/server/modules/warehouse/application/use-cases/RefreshShelfLegalWeight";
import { updateFullAssortmentDefinitionDTOSchema } from "@/server/modules/storage/application/dto/UpdateFullAssortmentDefinitionDTO";
import type { AssortmentDefinitionDTO } from "@/server/modules/assortment/application/dto/shared/AssortmentDefinitionDTO";
import { UpdateFullAssortmentDefinition } from "@/server/modules/storage/application/use-cases/UpdateFullAssortmentDefinition";
import { GetAssortmentDefinition } from "@/server/modules/assortment/application/use-cases/GetAssortmentDefinition";
import { UpdateAssortmentDefinition } from "@/server/modules/assortment/application/use-cases/UpdateAssortmentDefinition";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const updateAssortment = procedure
	.input(updateFullAssortmentDefinitionDTOSchema)
	.mutation<AssortmentDefinitionDTO>(async ({ input, ctx }) => {
		const services = getServices(ctx);
		const presets = getPresets(services);

		const assortmentRepository = services.repositories.assortment.db;
		const assortmentDefinitionRepository = services.repositories.assortmentDefinition.db;
		const shelfRepository = services.repositories.shelf.db;

		const shelfHelper = presets.shelfHelper.default;
		const fileHelper = presets.fileHelper.default;
		const assortmentFileHelper = presets.assortmentFileHelper.default.get(fileHelper);
		const fileManager = presets.fileManager.default.get(S3FileStorageBucket.ASSORTMENT_IMAGES);
		const assortmentDefinitionHelper = presets.assortmentDefinitionHelper.default;
		const assortmentDefinitionUtilities = services.utils.assortmentDefinition.default.get(
			assortmentDefinitionHelper,
			assortmentFileHelper
		);

		const getAssortmentDefinition = new GetAssortmentDefinition(assortmentDefinitionHelper, assortmentFileHelper);
		const updateAssortmentDefinition = new UpdateAssortmentDefinition(
			assortmentDefinitionRepository,
			assortmentDefinitionHelper,
			assortmentFileHelper
		);
		const getAllAssortment = new GetAllAssortment(assortmentRepository, assortmentDefinitionUtilities);
		const validateShelf = new ValidateShelf(shelfHelper);
		const refreshShelfLegalWeight = new RefreshShelfLegalWeight(shelfHelper, shelfRepository);
		const fetchFile = new FetchFile(fileHelper, fileManager);
		const deleteFileByPath = new DeleteFileByPath(fileHelper, fileManager);
		const uploadFile = new UploadFile(fileManager);

		const action = new UpdateFullAssortmentDefinition(
			getAssortmentDefinition,
			updateAssortmentDefinition,
			getAllAssortment,
			validateShelf,
			refreshShelfLegalWeight,
			fetchFile,
			deleteFileByPath,
			uploadFile
		);
		return await action.execute(input, ctx.user ?? undefined);
	});
