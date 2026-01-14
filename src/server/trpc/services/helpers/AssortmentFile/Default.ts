import { DefaultAssortmentFileHelper } from "@/server/modules/assortment/infrastructure/services/DefaultAssortmentFileHelper";
import { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import { GetServicesContext } from "../../context";

export const getDefaultAssortmentFileHelper = (ctx: GetServicesContext) => {
	return {
		get: (getFile: GetFile) => new DefaultAssortmentFileHelper(getFile)
	};
};
