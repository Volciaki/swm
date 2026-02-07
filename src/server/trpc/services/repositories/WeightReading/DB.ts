import { DBWeightReadingRepository } from "@/server/modules/warehouse/infrastructure/persistence/DBWeightReadingRepository";
import { DBWeightReading } from "@/server/modules/warehouse/infrastructure/entities/DBWeightReading";
import type { GetServicesContext } from "../../context";

export const getDBWeightReadingRepository = (ctx: GetServicesContext): DBWeightReadingRepository => {
	return new DBWeightReadingRepository(ctx.db.getRepository(DBWeightReading));
};
