import { UUID } from "@/server/utils";
import { WarehouseApplicationError } from "./WarehouseApplicationError";

export class CellNotFoundError extends WarehouseApplicationError {
    constructor(id: UUID) {
        super(`Couldn't find a Cell with an ID set to ${id.value}`);
    }
}
