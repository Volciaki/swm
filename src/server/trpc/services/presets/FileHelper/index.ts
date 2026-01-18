import { Services } from "../../get";
import { getDefaultFileHelperPreset } from "./Default";

export const getFileHelperPresets = (services: Services) => {
	return {
		default: getDefaultFileHelperPreset(services),
	};
}
