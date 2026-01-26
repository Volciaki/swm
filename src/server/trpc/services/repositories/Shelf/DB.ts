import { DBShelfRepository } from "@/server/modules/warehouse/infrastructure/persistence/DBShelfRepository";
import { DBShelf } from "@/server/modules/warehouse/infrastructure/entities/DBShelf";
import { DBCell } from "@/server/modules/warehouse/infrastructure/entities/DBCell";
import type { GetServicesContext } from "../../context";

export const getDBShelfRepository = (ctx: GetServicesContext): DBShelfRepository => {
	return new DBShelfRepository(ctx.db.getRepository(DBShelf), ctx.db.getRepository(DBCell));
};
