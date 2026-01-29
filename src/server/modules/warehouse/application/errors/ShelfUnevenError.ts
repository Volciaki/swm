import { ErrorName } from "@/server/utils/errors";
import { WarehouseApplicationError } from "./WarehouseApplicationError";

export class ShelfUnevenError extends WarehouseApplicationError<ErrorName.SHELF_UNEVEN> {
	constructor() {
		super({
			error: {
				code: "BAD_REQUEST",
				message: "A Shelf needs to contain the same amounts of cells on each row!",
			},
			metadata: {
				name: ErrorName.SHELF_UNEVEN,
				value: null,
			},
		});
	}
}
