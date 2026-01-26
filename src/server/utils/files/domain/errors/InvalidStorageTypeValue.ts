import { FilesDomainError } from "./FilesDomainError";
import { FileStorageType } from "../services/FileStorage";

export class InvalidStorageTypeValue extends FilesDomainError {
	constructor(value: string) {
		super(
			`${value} is not a valid value of metadata.storageType! Possible choices are: ${Object.values(FileStorageType)}.`
		);
	}
}
