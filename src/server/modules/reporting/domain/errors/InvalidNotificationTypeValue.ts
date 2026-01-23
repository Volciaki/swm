import { ReportType } from "../entities/Report";
import { ReportingDomainError } from "./ReportingDomainError";

export class InvalidReportTypeValue extends ReportingDomainError {
	constructor(value: string) {
		super(`${value} is not a valid value of a Report's type! Possible choices are: ${Object.values(ReportType)}.`);
	}
}
