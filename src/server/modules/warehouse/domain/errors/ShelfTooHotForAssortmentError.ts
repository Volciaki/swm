import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { WarehouseDomainError } from "./WarehouseDomainError";

export class ShelfTooHotForAssortmentError extends WarehouseDomainError<ErrorName.SHELF_TOO_HOT_FOR_ASSORTMENT> {
	constructor(value: ErrorMetadataValue[ErrorName.SHELF_TOO_HOT_FOR_ASSORTMENT]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `The assortment supports temperatures up to ${value.assortmentMaximalTemperatureCelsius} when contained, while Shelf's minimal temperature is ${value.shelfMinimalTemperatureCelsius}`,
			},
			metadata: {
				name: ErrorName.SHELF_TOO_HOT_FOR_ASSORTMENT,
				value,
			},
		});
	}
}
