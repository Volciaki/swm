import { DefaultAssortmentDefinitionUtilities } from "@/server/modules/assortment/infrastructure/services/DefaultAssortmentDefinitionUtilities";
import type { AssortmentDefinitionHelper } from "@/server/modules/assortment/application/helpers/AssortmentDefinitionHelper";
import type { AssortmentFileHelper } from "@/server/modules/assortment/application/services/AssortmentFileHelper";
import type { GetServicesContext } from "../../context";

export const getDefaultAssortmentDefinitionUtilities = (ctx: GetServicesContext) => {
	return {
		get: (assortmentDefinitionHelper: AssortmentDefinitionHelper, assortmentFileHelper: AssortmentFileHelper) =>
			new DefaultAssortmentDefinitionUtilities(assortmentDefinitionHelper, assortmentFileHelper)
	};
};
