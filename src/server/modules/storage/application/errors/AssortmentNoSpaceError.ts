import { StorageApplicationError } from "./StorageApplicationError";

export class AssortmentNoSpaceError extends StorageApplicationError {
	constructor(details: string) {
		super(`There's no suitable space for new assortment of that kind. Details: ${details}`);
	}
}
