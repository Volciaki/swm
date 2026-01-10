import { Distance } from "@/server/utils";
import { WarehouseDomainError } from "./WarehouseDomainError";

export class AssortmentTooLongError extends WarehouseDomainError {
	constructor(passedLength: Distance, maxLength: Distance) {
		super(`Attempted to store assortment with ${passedLength.toSringMillimeters()} of height, while the Shelf supports only ${maxLength.toSringMillimeters()}.`);
	}
}
