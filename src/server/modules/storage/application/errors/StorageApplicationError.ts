export class StorageApplicationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "StorageApplicationError";
	}
}
