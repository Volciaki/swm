import type { ErrorMetadataValue } from "../errors";
import { ErrorName, UtilsError } from "../errors";

export class NegativeDistanceError extends UtilsError<ErrorName.NEGATIVE_DISTANCE> {
	constructor(value: ErrorMetadataValue[ErrorName.NEGATIVE_DISTANCE]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `Distance can't be negative! Got: ${value.value}`,
			},
			metadata: {
				name: ErrorName.NEGATIVE_DISTANCE,
				value,
			},
		});
	}
}
