import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { ReportType } from "../entities/Report";
import { ReportingDomainError } from "./ReportingDomainError";

export class InvalidReportTypeValue extends ReportingDomainError<ErrorName.INVALID_REPORT_TYPE_VALUE> {
	constructor(value: ErrorMetadataValue[ErrorName.INVALID_REPORT_TYPE_VALUE]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `${value.type} is not a valid value of a Report's type! Possible choices are: ${Object.values(ReportType)}.`,
			},
			metadata: {
				name: ErrorName.INVALID_REPORT_TYPE_VALUE,
				value,
			},
		});
	}
}
