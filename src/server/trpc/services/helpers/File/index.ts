import { GetServicesContext } from "../../context";
import { getDefaultFileHelper } from "./Default";

export const getFileHelperServices = (ctx: GetServicesContext) => {
	return {
		default: getDefaultFileHelper(ctx),
	};
};
