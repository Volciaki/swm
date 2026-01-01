import { UUID } from "@/server/utils";
import { WarehouseDomainError } from "./WarehouseDomainError";

export class ShelfFullError extends WarehouseDomainError {
    constructor(id: UUID) {
        super(`Shelf with an ID of ${id} has no empty cells left!`);
    }
}
