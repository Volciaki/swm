import { UtilsError } from "../error";

export class NegativeWeightError extends UtilsError {
	constructor(grams: number) {
		super(`Weight can't be negative! Got: ${grams}g.`);
	}
}
