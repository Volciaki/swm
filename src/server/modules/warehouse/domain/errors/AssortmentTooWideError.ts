import type { Distance } from "@/server/utils";
import { WarehouseDomainError } from "./WarehouseDomainError";

export class AssortmentTooWideError extends WarehouseDomainError {
	constructor(passedWidth: Distance, maxWidth: Distance) {
		super(
			`Attempted to store assortment with ${passedWidth.toSringMillimeters()} of width, while the Shelf supports only ${maxWidth.toSringMillimeters()}.`
		);
	}
}
