import { UUID } from "@/server/utils/uuid";

type PrivateFile = {
	isPublic: false,
	publicUrl: undefined,
};

type PublicFile = {
	isPublic: true,
	publicUrl: string,
};

export type FileVisibility = PrivateFile | PublicFile;

export class FileReference<V extends FileVisibility = PublicFile> {
	private constructor(
		private readonly _id: UUID,
		private readonly _sizeBytes: number,
		private readonly _mimeType: string,
		// TODO: Do we need this? I guess that this could be used for finding files in minio.
		private readonly _path: string,
		private readonly _visibility: V,
	) {}

	get visibility() { return this._visibility };


	static create<V extends FileVisibility>(
		id: UUID,
		sizeBytes: number,
		mimeType: string,
		path: string,
		visibility: V,
	) {
		return new FileReference<V>(id, sizeBytes, mimeType, path, visibility);
	}
}
