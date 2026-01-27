import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { StorageApplicationError } from "./StorageApplicationError";

export class CellAlreadyTakenError extends StorageApplicationError<ErrorName.CELL_ALREADY_TAKEN> {
	constructor(value: ErrorMetadataValue[ErrorName.CELL_ALREADY_TAKEN]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `Cell with an ID of ${value.id} already has Assortment assigned! Take it down before adding new one.`,
			},
			metadata: {
				name: ErrorName.CELL_ALREADY_TAKEN,
				value,
			},
		});
	}
}
