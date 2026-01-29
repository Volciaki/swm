import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { WarehouseApplicationError } from "./WarehouseApplicationError";

export class ShelfNotFoundError extends WarehouseApplicationError<ErrorName.SHELF_NOT_FOUND> {
	constructor(value: ErrorMetadataValue[ErrorName.SHELF_NOT_FOUND]) {
		super({
			error: {
				code: "NOT_FOUND",
				message: `Couldn't find a Shelf with an ID set to ${value.id}`,
			},
			metadata: {
				name: ErrorName.SHELF_NOT_FOUND,
				value,
			},
		});
	}
}
