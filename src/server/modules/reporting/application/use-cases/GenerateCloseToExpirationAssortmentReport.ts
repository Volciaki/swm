import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { GenerateCloseToExpirationAssortmentReportResponseDTO } from "../dto/GenerateCloseToExpirationAssortmentReportResponseDTO";
import type { CloseToExpirationAssortmentReportGenerator } from "../../domain/services/ReportGenerator";
import type { ReportHelper } from "../helpers/ReportHelper";
import { ReportMapper } from "../../infrastructure/mappers/ReportMapper";

export class GenerateCloseToExpirationAssortmentReport {
	constructor(
		private readonly closeToExpirationAssortmenrReportGenerator: CloseToExpirationAssortmentReportGenerator,
		private readonly reportHelper: ReportHelper
	) {}

	async execute(currentUser?: UserDTO): Promise<GenerateCloseToExpirationAssortmentReportResponseDTO> {
		if (!currentUser) throw new UnauthorizedError();

		const generatedReport = await this.closeToExpirationAssortmenrReportGenerator.generate();
		const report = await this.reportHelper.createFromGenerated(generatedReport);
		return ReportMapper.fromEntityToDTO(report);
	}
}
