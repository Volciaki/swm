import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { BackupApplicationError } from "./BackupApplicationError";

export class BackupNotFoundError extends BackupApplicationError<ErrorName.BACKUP_NOT_FOUND> {
	constructor(value: ErrorMetadataValue[ErrorName.BACKUP_NOT_FOUND]) {
		super({
			error: {
				code: "NOT_FOUND",
				message: `Couldn't find a Backup with an ID set to ${value.id}`,
			},
			metadata: {
				name: ErrorName.BACKUP_NOT_FOUND,
				value,
			},
		});
	}
}
