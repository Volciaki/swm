import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { AssortmentApplicationError } from "./AssortmentApplicationError";

export class AssortmentNotFoundError extends AssortmentApplicationError<ErrorName.ASSORTMENT_NOT_FOUND> {
	constructor(value: ErrorMetadataValue[ErrorName.ASSORTMENT_NOT_FOUND]) {
		super({
			error: {
				code: "NOT_FOUND",
				message: `Assortment with an ID of ${value.id} doesn't exist!`,
			},
			metadata: {
				name: ErrorName.ASSORTMENT_NOT_FOUND,
				value,
			},
		});
	}
}
