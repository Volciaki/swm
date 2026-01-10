import { UUID } from "@/server/utils";
import { WarehouseDomainError } from "./WarehouseDomainError";

export class CellNotFoundError extends WarehouseDomainError {
	constructor(id: UUID) {
		super(`Couldn't find a Cell with an ID set to ${id.value}`);
	}
}
