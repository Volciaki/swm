import type { Services } from "../../get";
import { getDefaultAssortmentFileHelperPreset } from "./Default";

export const getAssortmentFileHelperPresets = (services: Services) => {
	return {
		default: getDefaultAssortmentFileHelperPreset(services),
	};
};
