import { DefaultTemperatureExceededDetailsReportGenerator } from "@/server/modules/reporting/infrastructure/services/DefaultTemperatureExceededDetailsReportGenerator";
import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import type { GetShelfTemperatureReadings } from "@/server/modules/warehouse/application/use-cases/GetShelfTemperatureReading";
import type { GetServicesContext } from "../../context";

export const getDefaultTemperatureExceededDetailsReportGenerator = (ctx: GetServicesContext) => {
	return {
		get: (
			getAllAssortment: GetAllAssortment,
			getAllShelves: GetAllShelves,
			getShelfTemperatureReadings: GetShelfTemperatureReadings
		) =>
			new DefaultTemperatureExceededDetailsReportGenerator(
				getAllAssortment,
				getAllShelves,
				getShelfTemperatureReadings
			),
	};
};
