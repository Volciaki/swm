export class IdentityApplicationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "IdentityApplicationError";
	}
}
