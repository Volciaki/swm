import { GenerateFullStorageShowcaseReport } from "@/server/modules/reporting/application/use-cases/GenerateFullStorageShowcaseReport";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import type { ReportDTO } from "@/server/modules/reporting/application/dto/shared/ReportDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const generateFullStorageShowcase = procedure.mutation<ReportDTO>(async ({ ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const shelfRepository = services.repositories.shelf.db;
	const assortmentRepository = services.repositories.assortment.db;
	const fileHelper = presets.fileHelper.default;
	const assortmentFileHelper = presets.assortmentFileHelper.default.get(fileHelper);

	const getAllAssortment = new GetAllAssortment(assortmentRepository, assortmentFileHelper);
	const getAllShelves = new GetAllShelves(shelfRepository);

	const fullStorageShowcaseReportGenerator = services.utils.fullStorageShowcaseReportGenerator.default.get(
		getAllAssortment,
		getAllShelves
	);
	const reportHelper = presets.reportHelper.default;

	const action = new GenerateFullStorageShowcaseReport(fullStorageShowcaseReportGenerator, reportHelper);
	return await action.execute(ctx.user ?? undefined);
});
