import { DBTwoFactorAuthenticationSessionRepository } from "@/server/modules/identity/infrastructure/persistence/DBTwoFactorAuthenticationSessionRepository";
import { DBTwoFactorAuthenticationSession } from "@/server/modules/identity/infrastructure/entities/DBTwoFactorAuthenticationSession";
import type { GetServicesContext } from "../../context";

export const getDBTwoFactorAuthenticationSessionRepository = (
	ctx: GetServicesContext
): DBTwoFactorAuthenticationSessionRepository => {
	return new DBTwoFactorAuthenticationSessionRepository(ctx.db.getRepository(DBTwoFactorAuthenticationSession));
};
