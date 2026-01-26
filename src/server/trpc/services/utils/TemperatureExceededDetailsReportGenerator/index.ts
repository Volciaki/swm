import type { GetServicesContext } from "../../context";
import { getDefaultTemperatureExceededDetailsReportGenerator } from "./Default";

export const getTemperatureExceededDetailsReportGeneratorServices = (ctx: GetServicesContext) => {
	return {
		default: getDefaultTemperatureExceededDetailsReportGenerator(ctx),
	};
};
