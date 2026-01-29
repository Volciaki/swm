import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { StorageApplicationError } from "./StorageApplicationError";

export class AssortmentNoSpaceError extends StorageApplicationError<ErrorName.ASSORTMENT_NO_SPACE> {
	constructor(value: ErrorMetadataValue[ErrorName.ASSORTMENT_NO_SPACE]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `There's no suitable space for new assortment of that kind. Details: ${value.details}`,
			},
			metadata: {
				name: ErrorName.ASSORTMENT_NO_SPACE,
				value,
			},
		});
	}
}
