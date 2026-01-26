import { BackupInfrastructureError } from "./BackupInfrastructureError";

export class NoBackupUtilitiesError extends BackupInfrastructureError {
	constructor(binary: string) {
		super(
			`The server is missing backup utilities required in order to use this functionality. It should have "${binary}" available.`
		);
	}
}
