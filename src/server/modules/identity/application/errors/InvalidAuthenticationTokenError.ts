export class InvalidAuthenticationTokenError extends Error {
	constructor(token: string) {
		super(`Passed token (${token}) can't be decoded!`);
	}
}
