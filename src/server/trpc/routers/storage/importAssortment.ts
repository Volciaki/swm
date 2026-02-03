import { ImportAndReplaceAssortmentDefinitions } from "@/server/modules/storage/application/use-cases/ImportAndReplaceAssortment";
import { importAndReplaceAssortmentDefinitionsDTOSchema } from "@/server/modules/storage/application/dto/ImportAndReplaceAssortmentDefinitionsDTO";
import type { AssortmentDefinitionDTO } from "@/server/modules/assortment/application/dto/shared/AssortmentDefinitionDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const importAssortment = procedure
	.input(importAndReplaceAssortmentDefinitionsDTOSchema)
	.mutation<AssortmentDefinitionDTO[]>(async ({ input, ctx }) => {
		const services = getServices(ctx);
		const presets = getPresets(services);

		const storageAssortmentDefinitionsHelper = presets.storageAssortmentDefinitionHelper.default;

		const action = new ImportAndReplaceAssortmentDefinitions(storageAssortmentDefinitionsHelper);
		return await action.execute(input, ctx.user ?? undefined);
	});
