import { ReportType } from "../../domain/entities/Report";
import { DefaultBaseReportGenerator } from "./DefaultBaseReportGenerator";

export class DefaultTemperatureExceededDetailsReportGenerator extends DefaultBaseReportGenerator<ReportType.TEMPERATURE_EXCEEDED_DETAILS> {
	protected getType() { return ReportType.TEMPERATURE_EXCEEDED_DETAILS as const };

	async generate() {
		this.document.text("DefaultTemperatureExceededDetailsReportGenerator");
		return this.getReturnValue();
	}
}
