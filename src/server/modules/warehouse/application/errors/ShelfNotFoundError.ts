import type { UUID } from "@/server/utils";
import { WarehouseApplicationError } from "./WarehouseApplicationError";

export class ShelfNotFoundError extends WarehouseApplicationError {
	constructor(id: UUID) {
		super(`Couldn't find a Shelf with an ID set to ${id.value}`);
	}
}
