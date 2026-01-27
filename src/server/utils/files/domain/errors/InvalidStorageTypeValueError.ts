import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { FileStorageType } from "../services/FileStorage";
import { FilesDomainError } from "./FilesDomainError";

export class InvalidStorageTypeValueError extends FilesDomainError<ErrorName.INVALID_STORAGE_TYPE_VALUE> {
	constructor(value: ErrorMetadataValue[ErrorName.INVALID_STORAGE_TYPE_VALUE]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `${value.type} is not a valid value of metadata.storageType! Possible choices are: ${Object.values(FileStorageType)}.`,
			},
			metadata: {
				name: ErrorName.INVALID_STORAGE_TYPE_VALUE,
				value,
			},
		});
	}
}
