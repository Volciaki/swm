import { GenerateFullStorageShowcaseReport } from "@/server/modules/reporting/application/use-cases/GenerateFullStorageShowcaseReport";
import { ReportDTO } from "@/server/modules/reporting/application/dto/shared/ReportDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const generateFullStorageShowcase = procedure.mutation<ReportDTO>(async ({ ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const fullStorageShowcaseReportGenerator = services.utils.fullStorageShowcaseReportGenerator.default;
	const reportHelper = presets.reportHelper.default;

	const action = new GenerateFullStorageShowcaseReport(fullStorageShowcaseReportGenerator, reportHelper);
	return await action.execute(ctx.user ?? undefined);
})
