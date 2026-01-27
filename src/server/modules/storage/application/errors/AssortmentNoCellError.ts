import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { StorageApplicationError } from "./StorageApplicationError";

export class AssortmentNoCellError extends StorageApplicationError<ErrorName.ASSORTMENT_NO_CELL> {
	constructor(value: ErrorMetadataValue[ErrorName.ASSORTMENT_NO_CELL]) {
		super({
			error: {
				code: "INTERNAL_SERVER_ERROR",
				message: `Assortment with an ID of ${value.assortmentId} is placed in cell ${value.cellId}, but that cell doesn't exist.`,
			},
			metadata: {
				name: ErrorName.ASSORTMENT_NO_CELL,
				value,
			},
		});
	}
}
