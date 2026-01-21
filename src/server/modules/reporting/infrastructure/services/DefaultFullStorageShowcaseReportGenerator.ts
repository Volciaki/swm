import { ReportType } from "../../domain/entities/Report";
import { DefaultBaseReportGenerator } from "./DefaultBaseReportGenerator";

export class DefaultFullStorageShowcaseReportGenerator extends DefaultBaseReportGenerator<ReportType.FULL_STORAGE_SHOWCASE> {
	protected getType() { return ReportType.FULL_STORAGE_SHOWCASE as const };

	async generate() {
		this.document.text("DefaultFullStorageShowcaseReportGenerator");
		return this.getReturnValue();
	}
}
