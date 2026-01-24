import { S3FileStorageBucket } from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import { Services } from "../../get";

export const getDefaultFileManagerPresets = (services: Services) => {
	const uuidManager = services.utils.uuidManager.default;

	const repository = services.repositories.fileReference.db;
	const helper = services.helpers.file.default.get(repository, uuidManager);
	const encryptionManager = services.utils.encryptionManager.default;
	
	return {
		get: (bucket: S3FileStorageBucket) => {
			const storage = services.utils.fileStorage.s3.get(bucket);
			return services.utils.fileManager.default.get(storage, repository, helper, encryptionManager)
		},
	};
}
