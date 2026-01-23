import { GetServicesContext } from "../../context";
import { getDefaultCloseToExpirationAssortmentReportGenerator } from "./Default";

export const getCloseToExpirationAssortmentReportGeneratorServices = (ctx: GetServicesContext) => {
	return {
		default: getDefaultCloseToExpirationAssortmentReportGenerator(ctx),
	};
}
