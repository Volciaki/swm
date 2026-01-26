import type { GetServicesContext } from "../../context";
import { getDBAssortmentRepository } from "./DB";

export const getAssortmentRepositories = (ctx: GetServicesContext) => {
	return {
		db: getDBAssortmentRepository(ctx),
	};
};
