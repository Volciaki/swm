import { Services } from "../../get";
import { getDefaultFileManagerPresets } from "./Default";

export const getFileManagerPresets = (services: Services) => {
	return {
		default: getDefaultFileManagerPresets(services),
	};
}
