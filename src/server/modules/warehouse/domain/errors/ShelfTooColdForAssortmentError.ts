import { CelsiusDegrees } from "@/server/utils";
import { WarehouseDomainError } from "./WarehouseDomainError";

export class ShelfTooColdForAssortmentError extends WarehouseDomainError {
    constructor(assortmentMinimalTemperature: CelsiusDegrees, shelfMaximalTemperature: CelsiusDegrees) {
        super(`The assortment requires at least ${assortmentMinimalTemperature.toString()} for containment, while Shelf's maximal temperature is ${shelfMaximalTemperature.toString()}`);
    }
}
