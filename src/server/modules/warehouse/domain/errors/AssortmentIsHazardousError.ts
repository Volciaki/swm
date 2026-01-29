import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { WarehouseDomainError } from "./WarehouseDomainError";

export class AssortmentIsHazardousError extends WarehouseDomainError<ErrorName.ASSORTMENT_IS_HAZARDOUS> {
	constructor(value: ErrorMetadataValue[ErrorName.ASSORTMENT_IS_HAZARDOUS]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `Shelf with an ID of ${value.shelfId} doesn't support containing hazardous assortment.`,
			},
			metadata: {
				name: ErrorName.ASSORTMENT_IS_HAZARDOUS,
				value,
			},
		});
	}
}
