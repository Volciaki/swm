import { UtilsError, ErrorName } from "@/server/utils/errors";
import type { ErrorMetadataValue } from "@/server/utils/errors";

export class InvalidTemperatureRangeError extends UtilsError<ErrorName.INVALID_TEMPERATURE_RANGE> {
	constructor(value: ErrorMetadataValue[ErrorName.INVALID_TEMPERATURE_RANGE]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `Range ${value.minimalTemperatureCelsius}-${value.maximalTemperatureCelsius} is not valid!`,
			},
			metadata: {
				name: ErrorName.INVALID_TEMPERATURE_RANGE,
				value,
			},
		});
	}
}
