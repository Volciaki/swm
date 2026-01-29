import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName, UtilsError } from "@/server/utils/errors";

export class InvalidTemperatureValueError extends UtilsError<ErrorName.INVALID_TEMPERATURE> {
	constructor(value: ErrorMetadataValue[ErrorName.INVALID_TEMPERATURE]) {
		super({
			error: {
				code: "NOT_FOUND",
				message: `value: ${value.celsius} is not a valid temperature!`,
			},
			metadata: {
				name: ErrorName.INVALID_TEMPERATURE,
				value,
			},
		});
	}
}
