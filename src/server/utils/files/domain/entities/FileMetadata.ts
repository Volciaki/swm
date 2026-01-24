import { isValidEnumValue } from "@/server/utils/enums";
import { InvalidStorageTypeValue } from "../errors/InvalidStorageTypeValue";
import { FileStorageType } from "../services/FileStorage";

const stringIsFileStorageType = (value: string) => isValidEnumValue(FileStorageType, value);

export class FileMetadata {
	constructor(
		private readonly _storageType: FileStorageType,
		private readonly _bucket: string | null,
	) {}

	get storageType() { return this._storageType };
	get bucket() { return this._bucket };

	static create(
		storageType: string,
		bucket: string | null,
	) {
		const storageTypeIsValid = stringIsFileStorageType(storageType);
		if (!storageTypeIsValid) throw new InvalidStorageTypeValue(storageType);

		return new FileMetadata(storageType, bucket);
	}
}
