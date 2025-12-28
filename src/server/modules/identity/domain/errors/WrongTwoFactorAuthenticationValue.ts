import { IdentityDomainError } from "./IdentityDomainError";

export class WrongTwoFactorAuthenticationValueError extends IdentityDomainError {
    constructor(value: string) {
        super(`2FA value "${value}" is invalid!`);
    }
}
