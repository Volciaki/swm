import { UtilsError } from "../error";

export class InvalidUUIDError extends UtilsError {
    constructor(value: string) {
        super(`String must be a valid UUID, got: ${value}`);
    }
}
