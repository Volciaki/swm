import type { S3FileStorageBucket } from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import { S3FileStorage } from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import { S3StorageService } from "@/server/utils/files/infrastructure/services/S3StorageService";
import type { GetServicesContext } from "../../context";

export const getS3FileStorage = <T extends S3FileStorageBucket>(ctx: GetServicesContext) => {
	return {
		get: (bucket: T) => {
			const s3StorageService = S3StorageService.create();
			void s3StorageService.setup();

			const s3FileStorage = new S3FileStorage(s3StorageService, bucket);
			void s3FileStorage.setup();

			return s3FileStorage;
		},
	};
};
