import { DefaultFileManager } from "@/server/utils/files/infrastructure/services/FileManager";
import type { FileHelper } from "@/server/utils/files/application/helpers/FileHelper";
import type { FileReferenceRepository } from "@/server/utils/files/domain/services/FileReferenceRepository";
import type { FileStorage } from "@/server/utils/files/domain/services/FileStorage";
import type { EncryptionManager } from "@/server/utils/files/domain/services/EncryptionManager";
import type { GetServicesContext } from "../../context";

export const getDefaultFileManager = (ctx: GetServicesContext) => {
	return {
		get: (
			storage: FileStorage,
			repository: FileReferenceRepository,
			helper: FileHelper,
			encryptionManager: EncryptionManager
		) => new DefaultFileManager(storage, repository, helper, encryptionManager),
	};
};
