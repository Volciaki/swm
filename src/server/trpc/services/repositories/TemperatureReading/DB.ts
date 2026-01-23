import { DBTemperatureReadingRepository } from "@/server/modules/warehouse/infrastructure/persistence/DBTemperatureReadingRepository";
import { DBTemperatureReading } from "@/server/modules/warehouse/infrastructure/entities/DBTemperatureReading";
import { GetServicesContext } from "../../context";

export const getDBTemperatureReadingRepository = (ctx: GetServicesContext): DBTemperatureReadingRepository => {
	return new DBTemperatureReadingRepository(ctx.db.getRepository(DBTemperatureReading));
};
