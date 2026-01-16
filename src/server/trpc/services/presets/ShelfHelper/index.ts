import { Services } from "../../get";
import { getDefaultShelfHelperPreset } from "./Default";

export const getShelfHelperPresets = (services: Services) => {
	return {
		default: getDefaultShelfHelperPreset(services),
	};
}
