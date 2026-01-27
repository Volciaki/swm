import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName, UtilsError } from "@/server/utils/errors";

export class NegativeWeightError extends UtilsError<ErrorName.NEGATIVE_WEIGHT> {
	constructor(value: ErrorMetadataValue[ErrorName.NEGATIVE_WEIGHT]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `Weight can't be negative! Got: ${value.grams}g.`,
			},
			metadata: {
				name: ErrorName.NEGATIVE_WEIGHT,
				value,
			},
		});
	}
}
