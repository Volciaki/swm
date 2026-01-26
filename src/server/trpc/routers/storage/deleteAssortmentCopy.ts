import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { TakeDownAssortmentCopy } from "@/server/modules/storage/application/use-cases/TakeDownAssortmentCopy";
import type { AssortmentDTO } from "@/server/modules/assortment/application/dto/shared/AssortmentDTO";
import { putUpAssortmentCopyDTOSchema } from "@/server/modules/storage/application/dto/PutUpAssortmentCopyDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const deleteAssortmentCopy = procedure
	.input(putUpAssortmentCopyDTOSchema)
	.mutation<AssortmentDTO[]>(async ({ input, ctx }) => {
		const services = getServices(ctx);
		const presets = getPresets(services);

		const assortmentRepository = services.repositories.assortment.db;

		const storageAssortmentHelper = presets.storageAssortmentHelper.default;
		const assortmentHelper = presets.assortmentHelper.default;
		const fileHelper = presets.fileHelper.default;
		const assortmentFileHelper = presets.assortmentFileHelper.default.get(fileHelper);

		const getAssortmentAction = new GetAssortment(assortmentHelper, assortmentFileHelper);
		const getAllAssortmentAction = new GetAllAssortment(assortmentRepository, assortmentFileHelper);

		const action = new TakeDownAssortmentCopy(storageAssortmentHelper, getAssortmentAction, getAllAssortmentAction);
		return await action.execute(input, ctx.user ?? undefined);
	});
