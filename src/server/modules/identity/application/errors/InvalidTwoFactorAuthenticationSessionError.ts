import { IdentityApplicationError } from "./IdentityApplicationError";

export class InvalidTwoFactorAuthenticationSessionError extends IdentityApplicationError {
    constructor(id: string, userId: string) {
        super(`2FA session with an id of ${id} has a non existent user attached to it (${userId}). Please try again by generating a new 2FA session.`);
    }
}
