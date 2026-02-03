import type { GetServicesContext } from "../../context";
import { getDefaultAssortmentDefinitionUtilities } from "./Default";

export const getAssortmentDefinitionUtilitiesServices = (ctx: GetServicesContext) => {
	return {
		default: getDefaultAssortmentDefinitionUtilities(ctx),
	};
};
