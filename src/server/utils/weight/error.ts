import { UtilsError } from "../error";

export class NegativeWeightError extends UtilsError {
    constructor(value: number) {
        super(`Weight can't be negative! Got: ${value}.`);
    }
}
