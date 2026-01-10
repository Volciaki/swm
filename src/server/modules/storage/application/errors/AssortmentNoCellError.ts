import { UUID } from "@/server/utils";
import { StorageApplicationError } from "./StorageApplicationError";

export class AssortmentNoCellError extends StorageApplicationError {
	constructor(assortmentId: UUID, cellId: UUID) {
		super(`Assortment with an ID of ${assortmentId.value} is placed in cell ${cellId.value}, but that cell doesn't exist.`);
	}
}
