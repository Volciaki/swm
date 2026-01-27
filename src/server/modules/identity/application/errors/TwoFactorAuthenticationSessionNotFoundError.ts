import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { IdentityApplicationError } from "./IdentityApplicationError";

export class TwoFactorAuthenticationSessionNotFoundError extends IdentityApplicationError<ErrorName.TWO_FACTOR_AUTHENTICATION_SESSION_NOT_FOUND> {
	constructor(value: ErrorMetadataValue[ErrorName.TWO_FACTOR_AUTHENTICATION_SESSION_NOT_FOUND]) {
		super({
			error: {
				code: "NOT_FOUND",
				message: `2FA session with an ID of ${value.id} couldn't be found.`,
			},
			metadata: {
				name: ErrorName.TWO_FACTOR_AUTHENTICATION_SESSION_NOT_FOUND,
				value,
			},
		});
	}
}
