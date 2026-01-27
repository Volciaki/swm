import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName, UtilsError } from "@/server/utils/errors";

export class NegativeNumberError extends UtilsError<ErrorName.NEGATIVE_NUMBER> {
	constructor(value: ErrorMetadataValue[ErrorName.NEGATIVE_NUMBER]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `Value: ${value.value} is required to be positive!`,
			},
			metadata: {
				name: ErrorName.NEGATIVE_NUMBER,
				value,
			},
		});
	}
}
