import { UtilsError } from "../../errors";

export class NegativeNumberError extends UtilsError {
	constructor(value: number) {
		super(`Value: ${value} is required to be positive!`);
	}
}
