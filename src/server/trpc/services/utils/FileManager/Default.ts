import { DefaultFileManager } from "@/server/utils/files/infrastructure/services/FileManager";
import { FileHelper } from "@/server/utils/files/application/helpers/FileHelper";
import { FileReferenceRepository } from "@/server/utils/files/domain/services/FileReferenceRepository";
import { FileStorage } from "@/server/utils/files/domain/services/FileStorage";
import { GetServicesContext } from "../../context";
import { EncryptionManager } from "@/server/utils/files/domain/services/EncryptionManager";

export const getDefaultFileManager = (ctx: GetServicesContext) => {
	return {
		get: (
			storage: FileStorage,
			repository: FileReferenceRepository,
			helper: FileHelper,
			encryptionManager: EncryptionManager,
		) => new DefaultFileManager(storage, repository, helper, encryptionManager)
	};
}
