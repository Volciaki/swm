import { WarehouseApplicationError } from "./WarehouseApplicationError";

export class ShelfUnevenError extends WarehouseApplicationError {
	constructor() {
		super(`A Shelf needs to contain the same amounts of cells on each row!`);
	}
}
