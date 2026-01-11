export interface FileStorage {
	uploadFile(path: string, buffer: Buffer, mimeType?: string): Promise<void>;
	removeFile(path: string): Promise<void>;
};
