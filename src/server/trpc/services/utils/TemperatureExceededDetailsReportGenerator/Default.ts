import { DefaultTemperatureExceededDetailsReportGenerator } from "@/server/modules/reporting/infrastructure/services/DefaultTemperatureExceededDetailsReportGenerator";
import { GetServicesContext } from "../../context";

export const getDefaultTemperatureExceededDetailsReportGenerator = (ctx: GetServicesContext): DefaultTemperatureExceededDetailsReportGenerator => {
	return new DefaultTemperatureExceededDetailsReportGenerator();
}
