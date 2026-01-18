import { UtilsError } from "../errors";

export class NegativeWeightError extends UtilsError {
	constructor(grams: number) {
		super(`Weight can't be negative! Got: ${grams}g.`);
	}
}
