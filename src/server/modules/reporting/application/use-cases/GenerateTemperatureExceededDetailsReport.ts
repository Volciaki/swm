import { UnauthorizedError, UserDTO } from "@/server/utils";
import { TemperatureExceededDetailsReportGenerator } from "../../domain/services/ReportGenerator";
import { ReportHelper } from "../helpers/ReportHelper";
import { ReportMapper } from "../../infrastructure/mappers/ReportMapper";

export class GenerateTemperatureExceededDetailsReport {
	constructor(
		private readonly temperatureExceededDetailsReport: TemperatureExceededDetailsReportGenerator,
		private readonly reportHelper: ReportHelper,
	) {}

	async execute(currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const generatedReport = await this.temperatureExceededDetailsReport.generate();
		const report = await this.reportHelper.createFromGenerated(generatedReport);
		return ReportMapper.fromEntityToDTO(report);
	}
}
