import type { UUIDManager } from "@/server/utils";
import { DefaultFileHelper } from "@/server/utils/files/application/helpers/FileHelper";
import type { FileReferenceRepository } from "@/server/utils/files/domain/services/FileReferenceRepository";
import type { GetServicesContext } from "../../context";

export const getDefaultFileHelper = (ctx: GetServicesContext) => {
	return {
		get: (fileReferenceRepository: FileReferenceRepository, uuidManager: UUIDManager) =>
			new DefaultFileHelper(fileReferenceRepository, uuidManager),
	};
};
