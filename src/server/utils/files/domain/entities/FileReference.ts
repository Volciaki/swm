import { UUID } from "@/server/utils/uuid";
import { Visibility } from "./Visibility";
import { FileMetadata } from "./FileMetadata";

export class FileReference {
	private constructor(
		private readonly _id: UUID,
		private readonly _sizeBytes: number,
		private readonly _mimeType: string,
		private readonly _path: string,
		private readonly _visibility: Visibility,
		private readonly _metadata: FileMetadata,
	) {}

	get id() { return this._id };
	get sizeBytes() { return this._sizeBytes };
	get mimeType() { return this._mimeType };
	get path() { return this._path };
	get visibility() { return this._visibility };
	get metadata() { return this._metadata };

	static create(
		id: UUID,
		sizeBytes: number,
		mimeType: string,
		path: string,
		visibility: Visibility,
		metadata: FileMetadata,
	) {
		return new FileReference(id, sizeBytes, mimeType, path, visibility, metadata);
	}
}
