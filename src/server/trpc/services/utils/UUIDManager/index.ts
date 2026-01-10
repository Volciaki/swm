import { GetServicesContext } from "../../context";
import { getDefaultUUIDManager } from "./Default";

export const getUUIDManagerServices = (ctx: GetServicesContext) => {
	return {
		node: getDefaultUUIDManager(ctx)
	};
}
