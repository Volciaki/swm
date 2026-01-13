import { Visibility } from "../entities/Visibility";

export interface FileStorage {
	uploadFile(path: string, buffer: Buffer, mimeType?: string): Promise<void>;
	deleteFile(path: string): Promise<void>;
	fetchFile(path: string): Promise<Buffer>;
	getSharedVisibility(): Promise<Visibility>;
};
