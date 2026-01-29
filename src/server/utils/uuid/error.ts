import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName, UtilsError } from "@/server/utils/errors";

export class InvalidUUIDError extends UtilsError<ErrorName.INVALID_UUID> {
	constructor(value: ErrorMetadataValue[ErrorName.INVALID_UUID]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `String must be a valid UUID, got: ${value.value}`,
			},
			metadata: {
				name: ErrorName.INVALID_UUID,
				value,
			},
		});
	}
}
