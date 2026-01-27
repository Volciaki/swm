import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { IdentityApplicationError } from "./IdentityApplicationError";

export class InvalidTwoFactorAuthenticationSessionError extends IdentityApplicationError<ErrorName.INVALID_TWO_FACTOR_AUTHENTICATION_SESSION> {
	constructor(value: ErrorMetadataValue[ErrorName.INVALID_TWO_FACTOR_AUTHENTICATION_SESSION]) {
		super({
			error: {
				code: "INTERNAL_SERVER_ERROR",
				message: `2FA session with an id of ${value.id} has a non existent user attached to it (${value.userId}). Please try again by generating a new 2FA session.`,
			},
			metadata: {
				name: ErrorName.INVALID_TWO_FACTOR_AUTHENTICATION_SESSION,
				value,
			},
		});
	}
}
