import type { GetServicesContext } from "../../context";
import { getDefaultStorageAssortmentDefinitionHelper } from "./Default";

export const getStorageAssortmentDefinitionHelperServices = (ctx: GetServicesContext) => {
	return {
		default: getDefaultStorageAssortmentDefinitionHelper(ctx),
	};
};
