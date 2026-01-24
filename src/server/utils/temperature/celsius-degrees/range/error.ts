import { UtilsError } from "@/server/utils/errors";
import { CelsiusDegrees } from "../entity";

export class InvalidTemperatureRangeError extends UtilsError {
	constructor(minimal: CelsiusDegrees, maximal: CelsiusDegrees) {
		super(`Range ${minimal.toString()}-${maximal.toString()} is not valid!`);
	}
}
