import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { WarehouseDomainError } from "./WarehouseDomainError";

export class AssortmentTooTallError extends WarehouseDomainError<ErrorName.ASSORTMENT_TOO_TALL> {
	constructor(value: ErrorMetadataValue[ErrorName.ASSORTMENT_TOO_TALL]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `Attempted to store assortment with ${value.passedHeightMillimeters} of height, while the Shelf supports only ${value.maxHeightMillimeters}.`,
			},
			metadata: {
				name: ErrorName.ASSORTMENT_TOO_TALL,
				value,
			},
		});
	}
}
