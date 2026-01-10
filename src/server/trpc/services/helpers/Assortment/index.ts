import { GetServicesContext } from "../../context";
import { getDefaultAssortmentHelper } from "./Default";

export const getAssortmentHelperServices = (ctx: GetServicesContext) => {
	return {
		default: getDefaultAssortmentHelper(ctx),
	};
};
