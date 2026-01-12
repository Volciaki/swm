import { environment } from "@/server/environment";
import { Visibility } from "../../domain/entities/Visibility";
import { FileStorage } from "../../domain/services/FileStorage";
import { S3StorageService } from "../services/S3StorageService";

export enum S3FileStorageBucket {
	QR_CODES = "qr-codes",
};

export const s3FileStorageBucketOptions: Record<S3FileStorageBucket, { isPublic: boolean }> = {
	[S3FileStorageBucket.QR_CODES]: { isPublic: true },
};

export class S3FileStorage<T extends S3FileStorageBucket> implements FileStorage {
	constructor(
		private readonly s3StorageService: S3StorageService,
		private readonly bucket: T,
	) {}

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

	async getSharedVisibility() {
		const bucketOptions = s3FileStorageBucketOptions[this.bucket];
		const { isPublic } = bucketOptions;
		const publicUrl = `${environment.storage.publicUrl}/${this.bucket}`

		if (isPublic) return Visibility.create(isPublic, publicUrl);
		return Visibility.create(isPublic, undefined);
	}
}
