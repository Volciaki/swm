import { UnauthorizedError, UserDTO } from "@/server/utils";
import { GenerateCloseToExpirationAssortmentReportResponseDTO } from "../dto/GenerateCloseToExpirationAssortmentReportResponseDTO";
import { CloseToExpirationAssortmentReportGenerator } from "../../domain/services/ReportGenerator";
import { ReportHelper } from "../helpers/ReportHelper";
import { ReportMapper } from "../../infrastructure/mappers/ReportMapper";

export class GenerateCloseToExpirationAssortmentReport {
	constructor(
		private readonly closeToExpirationAssortmenrReportGenerator: CloseToExpirationAssortmentReportGenerator,
		private readonly reportHelper: ReportHelper,
	) {}

	async execute(currentUser?: UserDTO): Promise<GenerateCloseToExpirationAssortmentReportResponseDTO> {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const generatedReport = await this.closeToExpirationAssortmenrReportGenerator.generate();
		const report = await this.reportHelper.createFromGenerated(generatedReport);
		return ReportMapper.fromEntityToDTO(report);
	}
}
