import { IdentityDomainError } from "./IdentityDomainError";

export class AlreadyLoggedInError extends IdentityDomainError {
	constructor() {
		super("You're already logged in! Please log out and try again.");
	}
}
