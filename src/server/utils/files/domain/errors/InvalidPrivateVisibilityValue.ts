import { FilesDomainError } from "./FilesDomainError";

export class InvalidPrivateVisibilityValue extends FilesDomainError {
	constructor() {
		super("Private Visibility can't have a `publicUrl` assigned!");
	}
}
