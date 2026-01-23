import { DBReportRepository } from "@/server/modules/reporting/infrastructure/persistence/DBReportRepository";
import { DBReport } from "@/server/modules/reporting/infrastructure/entities/DBReport";
import { GetServicesContext } from "../../context";

export const getDBReportRepository = (ctx: GetServicesContext): DBReportRepository => {
	return new DBReportRepository(ctx.db.getRepository(DBReport));
};
