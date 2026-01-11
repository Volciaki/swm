import { S3FileStorage, S3FileStorageBucket } from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import { S3StorageService } from "@/server/utils/files/infrastructure/services/S3StorageService";
import { GetServicesContext } from "../../context";

export const getS3FileStorage = <T extends S3FileStorageBucket>(ctx: GetServicesContext) => {
	const s3StorageService = S3StorageService.create();

	return {
		get: (bucket: T) => new S3FileStorage(s3StorageService, bucket)
	};
}
