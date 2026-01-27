import { BackupApplicationError } from "./BackupApplicationError";

export class InvalidBackupError extends BackupApplicationError {
	constructor() {
		super("Can't apply specified backup! It's invalid.");
	}
}
