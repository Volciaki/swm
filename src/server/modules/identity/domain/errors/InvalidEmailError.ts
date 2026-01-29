import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { IdentityDomainError } from "./IdentityDomainError";

export class InvalidEmailError extends IdentityDomainError<ErrorName.INVALID_EMAIL> {
	constructor(value: ErrorMetadataValue[ErrorName.INVALID_EMAIL]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `String must be a valid e-mail address, got: ${value.email}`,
			},
			metadata: {
				name: ErrorName.INVALID_EMAIL,
				value,
			},
		});
	}
}
