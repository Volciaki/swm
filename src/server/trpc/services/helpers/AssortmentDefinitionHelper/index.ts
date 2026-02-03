import type { GetServicesContext } from "../../context";
import { getDefaultAssortmentDefinitionHelper } from "./Default";

export const getAssortmentDefinitionHelperServices = (ctx: GetServicesContext) => {
	return {
		default: getDefaultAssortmentDefinitionHelper(ctx),
	};
};
