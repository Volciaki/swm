import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { StorageApplicationError } from "./StorageApplicationError";

export class NoAssortmentToTakeDownError extends StorageApplicationError<ErrorName.NO_ASSORTMENT_TO_TAKE_DOWN> {
	constructor(value: ErrorMetadataValue[ErrorName.NO_ASSORTMENT_TO_TAKE_DOWN]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `There's no Assortment to take down, which would be using Assortment definition with an ID of ${value.definitionId}.`,
			},
			metadata: {
				name: ErrorName.NO_ASSORTMENT_TO_TAKE_DOWN,
				value,
			},
		});
	}
}
