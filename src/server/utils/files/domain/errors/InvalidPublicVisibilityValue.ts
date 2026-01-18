import { FilesDomainError } from "./FilesDomainError";

export class InvalidPublicVisibilityValue extends FilesDomainError {
	constructor() {
		super("Public Visibility has to have a `publicUrl` assigned!");
	}
}
