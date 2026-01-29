import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { IdentityDomainError } from "./IdentityDomainError";

export class WrongPasswordError extends IdentityDomainError<ErrorName.WRONG_PASSWORD> {
	constructor(value: ErrorMetadataValue[ErrorName.WRONG_PASSWORD]) {
		super({
			error: {
				code: "UNAUTHORIZED",
				message: `Password "${value.password}" is invalid for user with mail ${value.email}`,
			},
			metadata: {
				name: ErrorName.WRONG_PASSWORD,
				value,
			},
		});
	}
}
