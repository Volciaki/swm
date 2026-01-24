import { AssortmentDTO } from "@/server/modules/assortment/application/dto/shared/AssortmentDTO";
import { ImportAndReplaceAssortment } from "@/server/modules/storage/application/use-cases/ImportAndReplaceAssortment";
import { importAndReplaceAssortmentDTOSchema } from "@/server/modules/storage/application/dto/ImportAndReplaceAssortmentDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const importAssortment = procedure.input(importAndReplaceAssortmentDTOSchema).mutation<AssortmentDTO[]>(async ({ input, ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const storageAssortmentHelper = presets.storageAssortmentHelper.default;

	const action = new ImportAndReplaceAssortment(storageAssortmentHelper);
	return await action.execute(input, ctx.user ?? undefined);
});
