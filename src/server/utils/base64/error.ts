import { UtilsError } from "../errors";

export class Base64DomainError extends UtilsError {
	constructor(message: string) {
		super(message);
		this.name = "Base64DomainError";
	}
}

export class InvalidBase64 extends Base64DomainError {
	constructor(value: string) {
		super(`${value} is not a valid base 64 string!`);
	}
}
