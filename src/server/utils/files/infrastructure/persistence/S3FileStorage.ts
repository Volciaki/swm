import { getStreamAsBuffer as streamToBuffer } from "get-stream";
import { environment } from "@/server/environment";
import { Visibility } from "../../domain/entities/Visibility";
import { FileStorage, FileStorageType } from "../../domain/services/FileStorage";
import { S3StorageService } from "../services/S3StorageService";

export enum S3FileStorageBucket {
	QR_CODES = "qr-codes",
	ASSORTMENT_IMAGES = "assortment-images",
};

export const s3FileStorageBucketOptions: Record<S3FileStorageBucket, { isPublic: boolean }> = {
	[S3FileStorageBucket.QR_CODES]: { isPublic: true },
	[S3FileStorageBucket.ASSORTMENT_IMAGES]: { isPublic: true },
};

export class S3FileStorage<T extends S3FileStorageBucket> implements FileStorage {
	constructor(
		private readonly s3StorageService: S3StorageService,
		private readonly bucket: T,
	) { }

	get client() { return this.s3StorageService.client };

	async setup() {
		for (const bucketName of Object.values(S3FileStorageBucket)) {
			const bucket = {
				name: bucketName,
				...s3FileStorageBucketOptions[bucketName],
			};

			const bucketExists = await this.client.bucketExists(bucket.name);
			if (bucketExists) continue;

			await this.client.makeBucket(bucket.name);
			if (!bucket.isPublic) continue;

			await this.makeBucketPublic(bucket.name);
		}
	}

	async makeBucketPublic(bucket: S3FileStorageBucket) {
		const policy = {
			Version: "2012-10-17",
			Statement: [
				{
					Effect: "Allow",
					Principal: { AWS: ["*"] },
					Action: ["s3:GetObject"],
					Resource: [`arn:aws:s3:::${bucket}/*`],
				},
			],
		};
		await this.client.setBucketPolicy(bucket, JSON.stringify(policy));
	}

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

	async getVisibility(path: string) {
		const bucketOptions = s3FileStorageBucketOptions[this.bucket];
		const { isPublic } = bucketOptions;
		const publicUrl = `${environment.storage.publicUrl}/${this.bucket}/${path}`

		if (isPublic) return Visibility.create(isPublic, publicUrl);
		return Visibility.create(isPublic, undefined);
	}

	async fetchFile(path: string) {
		const stream = await this.client.getObject(this.bucket, path);
		return streamToBuffer(stream);
	}

	getStorageType() {
		return FileStorageType.S3;
	}
}
