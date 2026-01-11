import { UUID } from "@/server/utils/uuid";
import { Visibility } from "./Visibility";

export class FileReference {
	private constructor(
		private readonly _id: UUID,
		private readonly _sizeBytes: number,
		private readonly _mimeType: string,
		// TODO: Do we need this? I guess that this could be used for finding files in minio.
		private readonly _path: string,
		private readonly _visibility: Visibility,
	) {}

	get id() { return this._id };
	get sizeBytes() { return this._sizeBytes };
	get mimeType() { return this._mimeType };
	get path() { return this._path };
	get visibility() { return this._visibility };

	static create(
		id: UUID,
		sizeBytes: number,
		mimeType: string,
		path: string,
		visibility: Visibility,
	) {
		return new FileReference(id, sizeBytes, mimeType, path, visibility);
	}
}
