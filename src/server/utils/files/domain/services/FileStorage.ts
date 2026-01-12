export interface FileStorage {
	uploadFile(path: string, buffer: Buffer, mimeType?: string): Promise<void>;
	deleteFile(path: string): Promise<void>;
};
