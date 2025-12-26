import { IdentityApplicationError } from "./IdentityApplicationError";

export class UserNotFoundError extends IdentityApplicationError {
    constructor(fieldName: string, value: string) {
        super(`Couldn't find an user with a ${fieldName} set to ${value}`);
    }
}
