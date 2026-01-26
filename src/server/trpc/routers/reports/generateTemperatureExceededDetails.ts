import { GenerateTemperatureExceededDetailsReport } from "@/server/modules/reporting/application/use-cases/GenerateTemperatureExceededDetailsReport";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import { GetShelfTemperatureReadings } from "@/server/modules/warehouse/application/use-cases/GetShelfTemperatureReading";
import type { ReportDTO } from "@/server/modules/reporting/application/dto/shared/ReportDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const generateTemperatureExceededDetails = procedure.mutation<ReportDTO>(async ({ ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const assortmentRepository = services.repositories.assortment.db;
	const fileHelper = presets.fileHelper.default;
	const assortmentFileHelper = presets.assortmentFileHelper.default.get(fileHelper);
	const shelfRepository = services.repositories.shelf.db;
	const shelfHelper = presets.shelfHelper.default;
	const temperatureReadingRepository = services.repositories.temperatureReading.db;

	const getAllAssortment = new GetAllAssortment(assortmentRepository, assortmentFileHelper);
	const getAllShelves = new GetAllShelves(shelfRepository);
	const getShelfTemperatureReadings = new GetShelfTemperatureReadings(shelfHelper, temperatureReadingRepository);

	const temperatureExceededDetailsReportGenerator =
		services.utils.temperatureExceededDetailsReportGenerator.default.get(
			getAllAssortment,
			getAllShelves,
			getShelfTemperatureReadings
		);
	const reportHelper = presets.reportHelper.default;

	const action = new GenerateTemperatureExceededDetailsReport(temperatureExceededDetailsReportGenerator, reportHelper);
	return await action.execute(ctx.user ?? undefined);
});
