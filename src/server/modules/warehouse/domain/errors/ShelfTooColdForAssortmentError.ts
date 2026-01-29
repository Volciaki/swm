import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { WarehouseDomainError } from "./WarehouseDomainError";

export class ShelfTooColdForAssortmentError extends WarehouseDomainError<ErrorName.SHELF_TOO_COLD_FOR_ASSORTMENT> {
	constructor(value: ErrorMetadataValue[ErrorName.SHELF_TOO_COLD_FOR_ASSORTMENT]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `The assortment requires at least ${value.assortmentMinimalTemperatureCelsius} for containment, while Shelf's maximal temperature is ${value.shelfMaximalTemperatureCelsius}`,
			},
			metadata: {
				name: ErrorName.SHELF_TOO_COLD_FOR_ASSORTMENT,
				value,
			},
		});
	}
}
