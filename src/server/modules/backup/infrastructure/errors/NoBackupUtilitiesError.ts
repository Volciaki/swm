import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { BackupInfrastructureError } from "./BackupInfrastructureError";

export class NoBackupUtilitiesError extends BackupInfrastructureError<ErrorName.NO_BACKUP_UTILITIES> {
	constructor(value: ErrorMetadataValue[ErrorName.NO_BACKUP_UTILITIES]) {
		super({
			error: {
				code: "INTERNAL_SERVER_ERROR",
				message: `The server is missing backup utilities required in order to use this functionality. It should have "${value.binary}" available.`,
			},
			metadata: {
				name: ErrorName.NO_BACKUP_UTILITIES,
				value,
			},
		});
	}
}
