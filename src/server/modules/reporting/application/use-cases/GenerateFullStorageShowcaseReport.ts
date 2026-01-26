import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { FullStorageShowcaseReportGenerator } from "../../domain/services/ReportGenerator";
import type { ReportHelper } from "../helpers/ReportHelper";
import { ReportMapper } from "../../infrastructure/mappers/ReportMapper";

export class GenerateFullStorageShowcaseReport {
	constructor(
		private readonly fullStorageShowcaseReportGenerator: FullStorageShowcaseReportGenerator,
		private readonly reportHelper: ReportHelper
	) {}

	async execute(currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const generatedReport = await this.fullStorageShowcaseReportGenerator.generate();
		const report = await this.reportHelper.createFromGenerated(generatedReport);
		return ReportMapper.fromEntityToDTO(report);
	}
}
