import { DefaultCloseToExpirationAssortmentReportGenerator } from "@/server/modules/reporting/infrastructure/services/DefaultCloseToExpirationAssortmentReportGenerator";
import { GetServicesContext } from "../../context";

export const getDefaultCloseToExpirationAssortmentReportGenerator = (ctx: GetServicesContext): DefaultCloseToExpirationAssortmentReportGenerator => {
	return new DefaultCloseToExpirationAssortmentReportGenerator();
}
