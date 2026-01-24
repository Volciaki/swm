import { GetServicesContext } from "../../context";
import { getDBBackupRepository } from "./DB";

export const getBackupRepositories = (ctx: GetServicesContext) => {
	return {
		db: getDBBackupRepository(ctx)
	};
};
