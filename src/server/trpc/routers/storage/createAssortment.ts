import { createAssortmentDefinitionDTOSchema } from "@/server/modules/storage/application/dto/CreateAssortmentDefinitionDTO";
import type { AssortmentDefinitionDTO } from "@/server/modules/assortment/application/dto/shared/AssortmentDefinitionDTO";
import { CreateFullAssortmentDefinition } from "@/server/modules/storage/application/use-cases/CreateFullAssortmentDefinition";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const createAssortment = procedure
	.input(createAssortmentDefinitionDTOSchema)
	.mutation<AssortmentDefinitionDTO>(async ({ input, ctx }) => {
		const services = getServices(ctx);
		const presets = getPresets(services);

		const storageAssortmentDefinitionHelper = presets.storageAssortmentDefinitionHelper.default;

		const action = new CreateFullAssortmentDefinition(storageAssortmentDefinitionHelper);
		return await action.execute(input);
	});
