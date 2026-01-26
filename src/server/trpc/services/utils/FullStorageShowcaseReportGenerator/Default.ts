import { DefaultFullStorageShowcaseReportGenerator } from "@/server/modules/reporting/infrastructure/services/DefaultFullStorageShowcaseReportGenerator";
import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import type { GetServicesContext } from "../../context";

export const getDefaultFullStorageShowcaseReportGenerator = (ctx: GetServicesContext) => {
	return {
		get: (getAllAssortment: GetAllAssortment, getShelves: GetAllShelves) =>
			new DefaultFullStorageShowcaseReportGenerator(getAllAssortment, getShelves),
	};
};
