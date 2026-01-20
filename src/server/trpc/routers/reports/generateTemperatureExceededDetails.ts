import { GenerateTemperatureExceededDetailsReport } from "@/server/modules/reporting/application/use-cases/GenerateTemperatureExceededDetailsReport";
import { ReportDTO } from "@/server/modules/reporting/application/dto/shared/ReportDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const generateTemperatureExceededDetails = procedure.mutation<ReportDTO>(async ({ ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const temperatureExceededDetailsReportGenerator = services.utils.temperatureExceededDetailsReportGenerator.default;
	const reportHelper = presets.reportHelper.default;

	const action = new GenerateTemperatureExceededDetailsReport(temperatureExceededDetailsReportGenerator, reportHelper);
	return await action.execute(ctx.user ?? undefined);
})
