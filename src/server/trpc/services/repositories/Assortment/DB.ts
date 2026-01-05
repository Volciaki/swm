import { DBAssortmentRepository } from "@/server/modules/assortment/infrastructure/persistence/DBAssortmentRepository";
import { DBAssortment } from "@/server/modules/assortment/infrastructure/entities/DBAssortment";
import { GetServicesContext } from "../../context";

export const getDBAssortmentRepository = (ctx: GetServicesContext): DBAssortmentRepository => {
    return new DBAssortmentRepository(ctx.db.getRepository(DBAssortment));
};
