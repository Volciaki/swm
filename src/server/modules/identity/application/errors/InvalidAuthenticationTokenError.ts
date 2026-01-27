import type { ErrorMetadataValue } from "@/server/utils";
import { ErrorName } from "@/server/utils";
import { IdentityApplicationError } from "./IdentityApplicationError";

export class InvalidAuthenticationTokenError extends IdentityApplicationError<ErrorName.INVALID_AUTHENTICATION_TOKEN> {
	constructor(value: ErrorMetadataValue[ErrorName.INVALID_AUTHENTICATION_TOKEN]) {
		super({
			error: {
				code: "PARSE_ERROR",
				message: `Passed token (${value.token}) can't be decoded!`,
			},
			metadata: {
				name: ErrorName.INVALID_AUTHENTICATION_TOKEN,
				value,
			},
		});
	}
}
