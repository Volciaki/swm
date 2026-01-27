import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { FilesApplicationError } from "./FilesApplicationError";

export class FileNotFoundError extends FilesApplicationError<ErrorName.FILE_NOT_FOUND> {
	constructor(value: ErrorMetadataValue[ErrorName.FILE_NOT_FOUND]) {
		super({
			error: {
				code: "NOT_FOUND",
				message: `File with a ${value.field} of ${value.value} doesn't exist!`,
			},
			metadata: {
				name: ErrorName.FILE_NOT_FOUND,
				value,
			},
		});
	}
}
