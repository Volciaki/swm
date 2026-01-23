import { GetServicesContext } from "../../context";
import { getDBReportRepository } from "./DB";

export const getReportRepositories = (ctx: GetServicesContext) => {
	return {
		db: getDBReportRepository(ctx)
	};
};
