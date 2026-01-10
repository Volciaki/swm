import { IdentityApplicationError } from "./IdentityApplicationError";

export class TwoFactorAuthenticationSessionNotFoundError extends IdentityApplicationError {
	constructor(id: string) {
		super(`2FA session with an ID of ${id} couldn't be found.`);
	}
}
