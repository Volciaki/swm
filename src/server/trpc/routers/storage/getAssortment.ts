import type { AssortmentDefinitionDTO } from "@/server/modules/assortment/application/dto/shared/AssortmentDefinitionDTO";
import { GetAssortmentDefinition } from "@/server/modules/assortment/application/use-cases/GetAssortmentDefinition";
import { getAssortmentDefinitionDTOSchema } from "@/server/modules/assortment/application/dto/GetAssortmentDefinitionDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const getAssortment = procedure
	.input(getAssortmentDefinitionDTOSchema)
	.query<AssortmentDefinitionDTO>(async ({ input, ctx }) => {
		const services = getServices(ctx);
		const presets = getPresets(services);

		const fileHelper = presets.fileHelper.default;

		const assortmentDefinitionHelper = presets.assortmentDefinitionHelper.default;
		const assortmentFileHelper = presets.assortmentFileHelper.default.get(fileHelper);

		const action = new GetAssortmentDefinition(assortmentDefinitionHelper, assortmentFileHelper);
		return await action.execute(input, undefined, ctx.user ?? undefined);
	});
