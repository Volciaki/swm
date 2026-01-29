import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName, UtilsError } from "@/server/utils/errors";

export class InvalidTimeFrameError extends UtilsError<ErrorName.INVALID_TIME_FRAME> {
	constructor(value: ErrorMetadataValue[ErrorName.INVALID_TIME_FRAME]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `A time frame can't be constructed using value: ${value.value}.`,
			},
			metadata: {
				name: ErrorName.INVALID_TIME_FRAME,
				value,
			},
		});
	}
}
