import { UUID } from "@/server/utils";
import { StorageApplicationError } from "./StorageApplicationError";

export class CellAlreadyTakenError extends StorageApplicationError {
    constructor(id: UUID) {
        super(`Cell with an ID of ${id.value} already has Assortment assigned! Take it down before adding new one.`);
    }
}
