import { DBUserRepository } from "@/server/modules/identity/infrastructure/persistence/DBUserRepository";
import { DBUser } from "@/server/modules/identity/infrastructure/entities/DBUser";
import type { GetServicesContext } from "../../context";

export const getDBUserRepository = (ctx: GetServicesContext): DBUserRepository => {
	return new DBUserRepository(ctx.db.getRepository(DBUser));
};
