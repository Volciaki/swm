import type { Services } from "../../get";
import { getDefaultStorageAssortmentDefinitionHelperPreset } from "./Default";

export const getStorageAssortmentDefinitionHelperPresets = (services: Services) => {
	return {
		default: getDefaultStorageAssortmentDefinitionHelperPreset(services),
	};
};
