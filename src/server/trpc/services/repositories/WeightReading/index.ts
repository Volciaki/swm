import type { GetServicesContext } from "../../context";
import { getDBWeightReadingRepository } from "./DB";

export const getWeightReadingRepositories = (ctx: GetServicesContext) => {
	return {
		db: getDBWeightReadingRepository(ctx),
	};
};
