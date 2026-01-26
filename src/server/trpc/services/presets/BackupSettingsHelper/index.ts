import type { Services } from "../../get";
import { getDefaultBackupSettingsHelperPreset } from "./Default";

export const getBackupSettingsHelperPresets = (services: Services) => {
	return {
		default: getDefaultBackupSettingsHelperPreset(services),
	};
};
