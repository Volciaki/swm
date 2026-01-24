import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { AssortmentDTO } from "@/server/modules/assortment/application/dto/shared/AssortmentDTO";
import { UpdateAssortment } from "@/server/modules/assortment/application/use-cases/UpdateAssortment";
import { ValidateShelf } from "@/server/modules/warehouse/application/use-cases/ValidateShelf";
import { UpdateShelfAssortment } from "@/server/modules/storage/application/use-cases/UpdateShelfAssortment";
import { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import { DeleteFileByPath } from "@/server/utils/files/application/use-cases/DeleteFileByPath";
import { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import { S3FileStorageBucket } from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import { updateShelfAssortmentDTOSchema } from "@/server/modules/storage/application/dto/UpdateShelfAssortmentDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";
import { RefreshShelfLegalWeight } from "@/server/modules/warehouse/application/use-cases/RefreshShelfLegalWeight";

export const updateAssortment = procedure.input(updateShelfAssortmentDTOSchema).mutation<AssortmentDTO>(async ({ input, ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const assortmentRepository = services.repositories.assortment.db;
	const shelfRepository = services.repositories.shelf.db;

	const shelfHelper = presets.shelfHelper.default;
	const assortmentHelper = presets.assortmentHelper.default;
	const fileHelper = presets.fileHelper.default;
	const assortmentFileHelper = presets.assortmentFileHelper.default.get(fileHelper);
	const fileManager = presets.fileManager.default.get(S3FileStorageBucket.ASSORTMENT_IMAGES);

	const getAssortmentAction = new GetAssortment(assortmentHelper, assortmentFileHelper);
	const updateAssortmentAction = new UpdateAssortment(assortmentRepository, assortmentHelper, assortmentFileHelper);
	const getAllAssortmentAction = new GetAllAssortment(assortmentRepository, assortmentFileHelper);
	const validateShelfAction = new ValidateShelf(shelfHelper);
	const refreshShelfLegalWeightAction = new RefreshShelfLegalWeight(shelfHelper, shelfRepository);
	const fetchFileAction = new FetchFile(fileHelper, fileManager);
	const deleteFileByPathAction = new DeleteFileByPath(fileHelper, fileManager);
	const uploadFileAction = new UploadFile(fileManager);

	const action = new UpdateShelfAssortment(
		getAssortmentAction,
		updateAssortmentAction,
		getAllAssortmentAction,
		validateShelfAction,
		refreshShelfLegalWeightAction,
		fetchFileAction,
		deleteFileByPathAction,
		uploadFileAction,
	);
	return await action.execute(input, ctx.user ?? undefined);
});
