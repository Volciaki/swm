import { UtilsError } from "../error";

export class InvalidTemperatureValueError extends UtilsError {
    constructor(value: string) {
        super(`value: ${value} is not a valid temperature!`);
    }
}
