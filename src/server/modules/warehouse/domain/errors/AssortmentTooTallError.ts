import { Distance } from "@/server/utils";
import { WarehouseDomainError } from "./WarehouseDomainError";

export class AssortmentTooTallError extends WarehouseDomainError {
    constructor(passedHeight: Distance, maxHeight: Distance) {
        super(`Attempted to store assortment with ${passedHeight.toSringMillimeters()} of height, while the Shelf supports only ${maxHeight.toSringMillimeters()}.`);
    }
}
