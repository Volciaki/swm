import type { UUID } from "@/server/utils";
import { WarehouseDomainError } from "./WarehouseDomainError";

export class AssortmentIsHazardousError extends WarehouseDomainError {
	constructor(shelfId: UUID) {
		super(`Shelf with an ID of ${shelfId.value} doesn't support containing hazardous assortment.`);
	}
}
