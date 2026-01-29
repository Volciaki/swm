import { ErrorName } from "@/server/utils/errors";
import { BackupApplicationError } from "./BackupApplicationError";

export class InvalidBackupError extends BackupApplicationError<ErrorName.INVALID_BACKUP> {
	constructor() {
		super({
			error: {
				code: "INTERNAL_SERVER_ERROR",
				message: "Can't apply specified backup! It's invalid.",
			},
			metadata: {
				name: ErrorName.INVALID_BACKUP,
				value: null,
			},
		});
	}
}
