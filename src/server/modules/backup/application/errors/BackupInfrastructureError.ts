export class BackupApplicationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "BackupApplicationError";
	}
}
