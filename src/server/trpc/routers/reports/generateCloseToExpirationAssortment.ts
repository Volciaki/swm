import { GenerateCloseToExpirationAssortmentReport } from "@/server/modules/reporting/application/use-cases/GenerateCloseToExpirationAssortmentReport";
import { ReportDTO } from "@/server/modules/reporting/application/dto/shared/ReportDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";

export const generateCloseToExpirationAssortment = procedure.mutation<ReportDTO>(async ({ ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const assortmentRepository = services.repositories.assortment.db;
	const fileHelper = presets.fileHelper.default;
	const assortmentFileHelper = presets.assortmentFileHelper.default.get(fileHelper);

	const getAllAssortmentAction = new GetAllAssortment(assortmentRepository, assortmentFileHelper);

	const closeToExpirationAssortmenrReportGenerator = services.utils.closeToExpirationAssortmentReportGenerator.default.get(getAllAssortmentAction);
	const reportHelper = presets.reportHelper.default;

	const action = new GenerateCloseToExpirationAssortmentReport(closeToExpirationAssortmenrReportGenerator, reportHelper);
	return await action.execute(ctx.user ?? undefined);
})
