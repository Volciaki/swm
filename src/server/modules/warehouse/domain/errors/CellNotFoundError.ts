import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { WarehouseDomainError } from "./WarehouseDomainError";

export class CellNotFoundError extends WarehouseDomainError<ErrorName.CELL_NOT_FOUND> {
	constructor(value: ErrorMetadataValue[ErrorName.CELL_NOT_FOUND]) {
		super({
			error: {
				code: "NOT_FOUND",
				message: `Couldn't find a Cell with an ID set to ${value.id}`,
			},
			metadata: {
				name: ErrorName.CELL_NOT_FOUND,
				value,
			},
		});
	}
}
