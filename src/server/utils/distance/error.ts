import { UtilsError } from "../errors";

export class NegativeDistanceError extends UtilsError {
	constructor(value: number) {
		super(`Distance can't be negative! Got: ${value}`);
	}
}
