import { WarehouseApplicationError } from "./WarehouseApplicationError";

export class NotEnoughShelves extends WarehouseApplicationError {
    constructor(minimalAmountOfShelves: number) {
        super(`The system is configured to keep at least ${minimalAmountOfShelves} shelves at all times. Deleting beyond this minimal amount is not supported.`);
    }
}
