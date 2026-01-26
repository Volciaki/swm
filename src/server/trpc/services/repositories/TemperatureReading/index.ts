import type { GetServicesContext } from "../../context";
import { getDBTemperatureReadingRepository } from "./DB";

export const getTemperatureReadingRepositories = (ctx: GetServicesContext) => {
	return {
		db: getDBTemperatureReadingRepository(ctx),
	};
};
