import { UtilsError } from "../errors";

export class InvalidUUIDError extends UtilsError {
	constructor(value: string) {
		super(`String must be a valid UUID, got: ${value}`);
	}
}
