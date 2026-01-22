import { DefaultFullStorageShowcaseReportGenerator } from "@/server/modules/reporting/infrastructure/services/DefaultFullStorageShowcaseReportGenerator";
import { GetServicesContext } from "../../context";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";

export const getDefaultFullStorageShowcaseReportGenerator = (ctx: GetServicesContext) => {
	return {
		get: (
			getAllAssortment: GetAllAssortment,
			getShelves: GetAllShelves,
		) => new DefaultFullStorageShowcaseReportGenerator(getAllAssortment, getShelves),
	};
}
