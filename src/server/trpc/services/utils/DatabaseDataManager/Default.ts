import { DefaultDatabaseDataManager } from "@/server/modules/backup/infrastructure/services/DefaultDatabaseDataManager";
import type { GetServicesContext } from "../../context";

export const getDefaultDatabaseDataManager = (ctx: GetServicesContext) => {
	return new DefaultDatabaseDataManager();
};
