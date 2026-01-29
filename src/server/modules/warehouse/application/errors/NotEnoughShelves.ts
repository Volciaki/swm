import type { ErrorMetadataValue } from "@/server/utils";
import { ErrorName } from "@/server/utils";
import { WarehouseApplicationError } from "./WarehouseApplicationError";

export class NotEnoughShelves extends WarehouseApplicationError<ErrorName.NOT_ENOUGH_SHELVES> {
	constructor(value: ErrorMetadataValue[ErrorName.NOT_ENOUGH_SHELVES]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `The system is configured to keep at least ${value.minimalAmountOfShelves} shelves at all times. Deleting beyond this minimal amount is not supported.`,
			},
			metadata: {
				name: ErrorName.NOT_ENOUGH_SHELVES,
				value,
			},
		});
	}
}
