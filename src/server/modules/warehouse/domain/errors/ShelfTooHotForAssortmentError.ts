import type { CelsiusDegrees } from "@/server/utils";
import { WarehouseDomainError } from "./WarehouseDomainError";

export class ShelfTooHotForAssortmentError extends WarehouseDomainError {
	constructor(assortmentMaximalTemperature: CelsiusDegrees, shelfMinimalTemperature: CelsiusDegrees) {
		super(
			`The assortment supports temperatures up to ${assortmentMaximalTemperature.toString()} when contained, while Shelf's minimal temperature is ${shelfMinimalTemperature.toString()}`
		);
	}
}
