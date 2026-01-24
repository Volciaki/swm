import { GetServicesContext } from "../../context";
import { getDBFileReferenceRepository } from "./DB";

export const getFileReferenceRepositories = (ctx: GetServicesContext) => {
	return {
		db: getDBFileReferenceRepository(ctx)
	};
};
