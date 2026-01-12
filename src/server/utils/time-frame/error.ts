import { UtilsError } from "../errors";

export class InvalidTimeFrameError extends UtilsError {
	constructor(value: number) {
		super(`A time frame can't be constructed using value: ${value}.`);
	}
}
