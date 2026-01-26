import type { GetServicesContext } from "../../context";
import { getDefaultUUIDManager } from "./Default";

export const getUUIDManagerServices = (ctx: GetServicesContext) => {
	return {
		default: getDefaultUUIDManager(ctx),
	};
};
