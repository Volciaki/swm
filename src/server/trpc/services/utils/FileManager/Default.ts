import { DefaultFileManager } from "@/server/utils/files/infrastructure/services/FileManager";
import { FileHelper } from "@/server/utils/files/application/helpers/FileHelper";
import { FileReferenceRepository } from "@/server/utils/files/domain/services/FileReferenceRepository";
import { FileStorage } from "@/server/utils/files/domain/services/FileStorage";
import { GetServicesContext } from "../../context";

export const getDefaultFileManager = (ctx: GetServicesContext) => {
	return {
		get: (
			storage: FileStorage,
			repository: FileReferenceRepository,
			helper: FileHelper,
		) => new DefaultFileManager(storage, repository, helper)
	};
}
