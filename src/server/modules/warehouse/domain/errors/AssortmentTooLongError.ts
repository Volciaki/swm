import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { WarehouseDomainError } from "./WarehouseDomainError";

export class AssortmentTooLongError extends WarehouseDomainError<ErrorName.ASSORTMENT_TOO_LONG> {
	constructor(value: ErrorMetadataValue[ErrorName.ASSORTMENT_TOO_LONG]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `Attempted to store assortment with ${value.passedLengthMillimeters} of length, while the Shelf supports only ${value.maxLengthMillimeters}.`,
			},
			metadata: {
				name: ErrorName.ASSORTMENT_TOO_LONG,
				value,
			},
		});
	}
}
