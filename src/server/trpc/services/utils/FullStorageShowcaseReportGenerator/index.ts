import type { GetServicesContext } from "../../context";
import { getDefaultFullStorageShowcaseReportGenerator } from "./Default";

export const getFullStorageShowcaseReportGeneratorServices = (ctx: GetServicesContext) => {
	return {
		default: getDefaultFullStorageShowcaseReportGenerator(ctx),
	};
};
