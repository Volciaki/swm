import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { IdentityDomainError } from "./IdentityDomainError";

export class WrongTwoFactorAuthenticationValueError extends IdentityDomainError<ErrorName.WRONG_TWO_FACTOR_AUTHENTICATION_VALUE> {
	constructor(value: ErrorMetadataValue[ErrorName.WRONG_TWO_FACTOR_AUTHENTICATION_VALUE]) {
		super({
			error: {
				code: "UNAUTHORIZED",
				message: `2FA value "${value.value}" is invalid!`,
			},
			metadata: {
				name: ErrorName.WRONG_TWO_FACTOR_AUTHENTICATION_VALUE,
				value,
			},
		});
	}
}
