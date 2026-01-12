import { FileStorage } from "../../domain/repositories/FileStorage";
import { S3StorageService } from "../services/S3StorageService";

export enum S3FileStorageBucket {
	QR_CODES = "qr-codes"
};

export class S3FileStorage<T extends S3FileStorageBucket> implements FileStorage {
	constructor(
		private readonly s3StorageService: S3StorageService,
		private readonly bucket: T,
	) { }

	get client() { return this.s3StorageService.client };

	async uploadFile(
		path: string,
		buffer: Buffer,
		mimeType?: string,
	) {
		await this.client.putObject(
			this.bucket,
			path,
			buffer,
			undefined,
			mimeType
				? {
					"Content-Type": mimeType,
				}
				: undefined
		);
	}

	async deleteFile(path: string) {
		await this.client.removeObject(this.bucket, path);
	}
}
