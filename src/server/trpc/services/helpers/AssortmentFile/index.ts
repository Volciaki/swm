import { GetServicesContext } from "../../context";
import { getDefaultAssortmentFileHelper } from "./Default";

export const getAssortmentFileHelperServices = (ctx: GetServicesContext) => {
	return {
		default: getDefaultAssortmentFileHelper(ctx),
	};
};
