import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { WarehouseDomainError } from "./WarehouseDomainError";

export class ShelfOverloadedError extends WarehouseDomainError<ErrorName.SHELF_OVERLOADED> {
	constructor(value: ErrorMetadataValue[ErrorName.SHELF_OVERLOADED]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `Shelf with an ID of ${value.id} supports up to ${value.maxWeightKg} of weight. After adding requested assortment it would weight ${value.attemptedWeightKg}.`,
			},
			metadata: {
				name: ErrorName.SHELF_OVERLOADED,
				value,
			},
		});
	}
}
