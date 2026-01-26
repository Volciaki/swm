import type { UUID, Weight } from "@/server/utils";
import { WarehouseDomainError } from "./WarehouseDomainError";

export class ShelfOverloadedError extends WarehouseDomainError {
	constructor(shelfId: UUID, maxWeight: Weight, attemptedWeight: Weight) {
		super(
			`Shelf with an ID of ${shelfId.value} supports up to ${maxWeight.toStringKilograms()} of weight. After adding requested assortment it would weight ${attemptedWeight.toStringKilograms()}.`
		);
	}
}
