import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { PutUpAssortmentCopy } from "@/server/modules/storage/application/use-cases/PutUpAssortmentCopy";
import { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import { PutUpAssortmentResponseDTO } from "@/server/modules/storage/application/dto/PutUpAssortmentResponseDTO";
import { putUpAssortmentCopyDTOSchema } from "@/server/modules/storage/application/dto/PutUpAssortmentCopyDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";
import { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import { S3FileStorageBucket } from "@/server/utils/files/infrastructure/persistence/S3FileStorage";

export const createAssortmentCopy = procedure.input(putUpAssortmentCopyDTOSchema).mutation<PutUpAssortmentResponseDTO>(async ({ input, ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const shelfRepository = services.repositories.shelf.db;
	const assortmentRepository = services.repositories.assortment.db;

	const storageAssortmentHelper = presets.storageAssortmentHelper.default;
	const assortmentHelper = presets.assortmentHelper.default;
	const fileHelper = presets.fileHelper.default;
	const assortmentFileHelper = presets.assortmentFileHelper.default.get(fileHelper);
	const fileManager = presets.fileManager.default.get(S3FileStorageBucket.QR_CODES);

	const getAssortmentAction = new GetAssortment(assortmentHelper, assortmentFileHelper);
	const getAllShelvesAction = new GetAllShelves(shelfRepository);
	const getAllAssortmentAction = new GetAllAssortment(assortmentRepository, assortmentFileHelper);
	const fetchFile = new FetchFile(fileHelper, fileManager);

	const action = new PutUpAssortmentCopy(storageAssortmentHelper, getAssortmentAction, getAllShelvesAction, getAllAssortmentAction, fetchFile);
	return await action.execute(input, ctx.user ?? undefined);
});
