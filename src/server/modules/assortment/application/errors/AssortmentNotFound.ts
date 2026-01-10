import { UUID } from "@/server/utils";
import { AssortmentApplicationError } from "./AssortmentApplicationError";

export class AssortmentNotFoundError extends AssortmentApplicationError {
	constructor(id: UUID) {
		super(`Assortment with an ID of ${id.value} doesn't exist!`);
	}
}
