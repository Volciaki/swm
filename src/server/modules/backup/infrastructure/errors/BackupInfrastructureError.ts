export class BackupInfrastructureError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "BackupInfrastructureError";
	}
}
