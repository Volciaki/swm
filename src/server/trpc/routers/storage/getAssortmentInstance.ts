import { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import type { AssortmentDTO } from "@/server/modules/assortment/application/dto/shared/AssortmentDTO";
import { getAssortmentDTOSchema } from "@/server/modules/assortment/application/dto/GetAssortmentDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const getAssortmentInstance = procedure
	.input(getAssortmentDTOSchema)
	.query<AssortmentDTO>(async ({ input, ctx }) => {
		const services = getServices(ctx);
		const presets = getPresets(services);

		const assortmentHelper = presets.assortmentHelper.default;
		const fileHelper = presets.fileHelper.default;
		const assortmentFileHelper = presets.assortmentFileHelper.default.get(fileHelper);
		const assortmentDefinitionHelper = presets.assortmentDefinitionHelper.default;
		const assortmentDefinitionUtilities = services.utils.assortmentDefinition.default.get(
			assortmentDefinitionHelper,
			assortmentFileHelper
		);

		const action = new GetAssortment(assortmentHelper, assortmentDefinitionUtilities);
		return await action.execute(input);
	});
