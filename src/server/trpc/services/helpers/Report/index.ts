import type { GetServicesContext } from "../../context";
import { getDefaultReportHelper } from "./Default";

export const getReportHelperServices = (ctx: GetServicesContext) => {
	return {
		default: getDefaultReportHelper(ctx),
	};
};
