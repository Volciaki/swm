import { IdentityDomainError } from "./IdentityDomainError";

export class InvalidEmailError extends IdentityDomainError {
	constructor(value: string) {
		super(`String must be a valid e-mail address, got: ${value}`);
	}
}
