import type { ErrorMetadataValue } from "../errors";
import { UtilsError, ErrorName } from "../errors";

export abstract class Base64DomainError<T extends ErrorName> extends UtilsError<T> {}

export class InvalidBase64 extends Base64DomainError<ErrorName.INVALID_BASE_64> {
	constructor(value: ErrorMetadataValue[ErrorName.INVALID_BASE_64]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `${value} is not a valid base 64 string!`,
			},
			metadata: {
				name: ErrorName.INVALID_BASE_64,
				value,
			},
		});
	}
}
