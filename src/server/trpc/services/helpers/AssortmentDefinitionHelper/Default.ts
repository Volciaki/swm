import { DefaultAssortmentDefinitionHelper } from "@/server/modules/assortment/application/helpers/AssortmentDefinitionHelper";
import type { AssortmentDefinitionRepository } from "@/server/modules/assortment/domain/repositories/AssortmentDefinitionRepository";
import type { UUIDManager } from "@/server/utils";
import type { GetServicesContext } from "../../context";

export const getDefaultAssortmentDefinitionHelper = (ctx: GetServicesContext) => {
	return {
		get: (assortmentDefinitionRepository: AssortmentDefinitionRepository, uuidManager: UUIDManager) =>
			new DefaultAssortmentDefinitionHelper(assortmentDefinitionRepository, uuidManager),
	};
};
