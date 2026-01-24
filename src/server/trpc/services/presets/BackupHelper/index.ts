import { Services } from "../../get";
import { getDefaultBackupHelperPreset } from "./Default";

export const getBackupHelperPresets = (services: Services) => {
	return {
		default: getDefaultBackupHelperPreset(services),
	};
}
