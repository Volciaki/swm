import { FileHelper } from "@/server/utils/files/application/helpers/FileHelper";
import { Services } from "../../get";

export const getDefaultFileHelperPreset = (services: Services): FileHelper => {
	const fileReferenceRepository = services.repositories.fileReference.db;
	const uuidManager = services.utils.uuidManager.default;
	
	return services.helpers.file.default.get(fileReferenceRepository, uuidManager);
}
