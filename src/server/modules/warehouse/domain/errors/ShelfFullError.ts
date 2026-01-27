import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { WarehouseDomainError } from "./WarehouseDomainError";

export class ShelfFullError extends WarehouseDomainError<ErrorName.SHELF_FULL> {
	constructor(value: ErrorMetadataValue[ErrorName.SHELF_FULL]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `Shelf with an ID of ${value.id} has no empty cells left!`,
			},
			metadata: {
				name: ErrorName.SHELF_FULL,
				value,
			},
		});
	}
}
