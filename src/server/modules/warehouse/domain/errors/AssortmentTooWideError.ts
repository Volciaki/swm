import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { WarehouseDomainError } from "./WarehouseDomainError";

export class AssortmentTooWideError extends WarehouseDomainError<ErrorName.ASSORTMENT_TOO_WIDE> {
	constructor(value: ErrorMetadataValue[ErrorName.ASSORTMENT_TOO_WIDE]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `Attempted to store assortment with ${value.passedWidthMillimeters} of width, while the Shelf supports only ${value.maxWidthMillimeters}.`,
			},
			metadata: {
				name: ErrorName.ASSORTMENT_TOO_WIDE,
				value,
			},
		});
	}
}
