import { GetAllAssortmentDefinitions } from "@/server/modules/assortment/application/use-cases/GetAllAssortmentDefinitions";
import type { AssortmentDefinitionDTO } from "@/server/modules/assortment/application/dto/shared/AssortmentDefinitionDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const getAllAssortments = procedure.query<AssortmentDefinitionDTO[]>(async ({ ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const fileHelper = presets.fileHelper.default;

	const assortmentFileHelper = presets.assortmentFileHelper.default.get(fileHelper);
	const assortmentDefinitionRepository = services.repositories.assortmentDefinition.db;

	const action = new GetAllAssortmentDefinitions(assortmentDefinitionRepository, assortmentFileHelper);
	return await action.execute(ctx.user ?? undefined);
});
