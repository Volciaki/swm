import { Services } from "../../get";
import { FileHelper } from "@/server/utils/files/application/helpers/FileHelper";
import { GetFile } from "@/server/utils/files/application/use-cases/GetFile";

export const getDefaultAssortmentFileHelperPreset = (services: Services) => {
	return {
		get: (fileHelper: FileHelper) => services.helpers.assortmentFile.default.get(new GetFile(fileHelper))
	};
}
