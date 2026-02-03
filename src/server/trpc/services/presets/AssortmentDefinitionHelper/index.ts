import type { Services } from "../../get";
import { getDefaultAssortmentDefinitionHelperPreset } from "./Default";

export const getAssortmentDefinitionHelperPresets = (services: Services) => {
	return {
		default: getDefaultAssortmentDefinitionHelperPreset(services),
	};
};
