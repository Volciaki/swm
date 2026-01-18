import { Services } from "../../get";
import { getDefaultAssortmentHelperPreset } from "./Default";

export const getAssortmentHelperPresets = (services: Services) => {
	return {
		default: getDefaultAssortmentHelperPreset(services),
	};
}
