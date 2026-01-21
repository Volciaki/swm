import { DefaultCloseToExpirationAssortmentReportGenerator } from "@/server/modules/reporting/infrastructure/services/DefaultCloseToExpirationAssortmentReportGenerator";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetServicesContext } from "../../context";

export const getDefaultCloseToExpirationAssortmentReportGenerator = (ctx: GetServicesContext) => {
	return {
		get: (getAllAssortment: GetAllAssortment) => new DefaultCloseToExpirationAssortmentReportGenerator(getAllAssortment),
	};
}
