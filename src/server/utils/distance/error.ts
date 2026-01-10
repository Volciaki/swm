import { UtilsError } from "../error";

export class NegativeDistanceError extends UtilsError {
	constructor(value: number) {
		super(`Distance can't be negative! Got: ${value}`);
	}
}
