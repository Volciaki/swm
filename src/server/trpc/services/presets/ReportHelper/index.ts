import { Services } from "../../get";
import { getDefaultReportHelperPreset } from "./Default";

export const getReportHelperPresets = (services: Services) => {
	return {
		default: getDefaultReportHelperPreset(services),
	};
}
