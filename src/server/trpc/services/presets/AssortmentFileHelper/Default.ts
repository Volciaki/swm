import type { FileHelper } from "@/server/utils/files/application/helpers/FileHelper";
import { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import type { Services } from "../../get";

export const getDefaultAssortmentFileHelperPreset = (services: Services) => {
	return {
		get: (fileHelper: FileHelper) => services.helpers.assortmentFile.default.get(new GetFile(fileHelper)),
	};
};
