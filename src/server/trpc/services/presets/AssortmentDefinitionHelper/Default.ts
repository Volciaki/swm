import type { AssortmentDefinitionHelper } from "@/server/modules/assortment/application/helpers/AssortmentDefinitionHelper";
import type { Services } from "../../get";

export const getDefaultAssortmentDefinitionHelperPreset = (services: Services): AssortmentDefinitionHelper => {
	const assortmentDefinitionRepository = services.repositories.assortmentDefinition.db;
	const uuidManager = services.utils.uuidManager.default;

	return services.helpers.assortmentDefinition.default.get(assortmentDefinitionRepository, uuidManager);
};
