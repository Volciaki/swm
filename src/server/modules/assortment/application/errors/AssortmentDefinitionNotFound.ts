import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { AssortmentApplicationError } from "./AssortmentApplicationError";

export class AssortmentDefinitionNotFoundError extends AssortmentApplicationError<ErrorName.ASSORTMENT_DEFINITION_NOT_FOUND> {
	constructor(value: ErrorMetadataValue[ErrorName.ASSORTMENT_DEFINITION_NOT_FOUND]) {
		super({
			error: {
				code: "NOT_FOUND",
				message: `Assortment definition with an ID of ${value.id} doesn't exist!`,
			},
			metadata: {
				name: ErrorName.ASSORTMENT_DEFINITION_NOT_FOUND,
				value,
			},
		});
	}
}
