import { GetServicesContext } from "../../context";
import { getDefaultEmailManager } from "./Default";

export const getEmailManagerServices = (ctx: GetServicesContext) => {
	return {
		default: getDefaultEmailManager(ctx)
	};
}
