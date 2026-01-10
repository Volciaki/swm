import { IdentityDomainError } from "./IdentityDomainError";

export class WrongPasswordError extends IdentityDomainError {
	constructor(password: string, email: string) {
		super(`Password "${password}" is invalid for user with mail ${email}`);
	}
}
