export class UnauthorizedError extends Error {
	constructor(message?: string) {
		super(message ?? "You're lacking permissions to perform this action.");
		this.name = "UnauthorizedError";
	}
}
