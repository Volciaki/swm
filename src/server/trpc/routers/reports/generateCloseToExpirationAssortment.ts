import { GenerateCloseToExpirationAssortmentReport } from "@/server/modules/reporting/application/use-cases/GenerateCloseToExpirationAssortmentReport";
import { ReportDTO } from "@/server/modules/reporting/application/dto/shared/ReportDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const generateCloseToExpirationAssortment = procedure.mutation<ReportDTO>(async ({ ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const closeToExpirationAssortmenrReportGenerator = services.utils.closeToExpirationAssortmentReportGenerator.default;
	const reportHelper = presets.reportHelper.default;

	const action = new GenerateCloseToExpirationAssortmentReport(closeToExpirationAssortmenrReportGenerator, reportHelper);
	return await action.execute(ctx.user ?? undefined);
})
