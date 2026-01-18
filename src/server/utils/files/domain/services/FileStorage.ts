import { Visibility } from "../entities/Visibility";

// Different implementations of file storage that our app supports.
export enum FileStorageType {
	S3 = "S3",
};

export interface FileStorage {
	uploadFile(path: string, buffer: Buffer, mimeType?: string): Promise<void>;
	deleteFile(path: string): Promise<void>;
	fetchFile(path: string): Promise<Buffer>;
	getVisibility(path: string): Promise<Visibility>;
	getStorageType(): FileStorageType;
};
