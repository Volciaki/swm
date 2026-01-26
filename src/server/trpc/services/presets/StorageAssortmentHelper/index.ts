import type { Services } from "../../get";
import { getDefaultStorageAssortmentHelperPreset } from "./Default";

export const getStorageAssortmentHelperPresets = (services: Services) => {
	return {
		default: getDefaultStorageAssortmentHelperPreset(services),
	};
};
