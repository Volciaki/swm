import { GetServicesContext } from "../../context";
import { getDBShelfRepository } from "./DB";

export const getShelfRepositories = (ctx: GetServicesContext) => {
	return {
		db: getDBShelfRepository(ctx)
	};
};
