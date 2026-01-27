import { ErrorName } from "@/server/utils/errors";
import { IdentityDomainError } from "./IdentityDomainError";

export class AlreadyLoggedInError extends IdentityDomainError<ErrorName.ALREADY_LOGGED_IN> {
	constructor() {
		super({
			error: {
				code: "FORBIDDEN",
				message: "You're already logged in! Please log out and try again.",
			},
			metadata: {
				name: ErrorName.ALREADY_LOGGED_IN,
				value: null,
			},
		});
	}
}
