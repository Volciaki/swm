import { DBBackupSettingsRepository } from "@/server/modules/backup/infrastructure/persistence/DBBackupSettingsRepository";
import { DBBackupSettings } from "@/server/modules/backup/infrastructure/entities/DBBackupSettings";
import type { GetServicesContext } from "../../context";

export const getDBBackupSettingsRepository = (ctx: GetServicesContext): DBBackupSettingsRepository => {
	return new DBBackupSettingsRepository(ctx.db.getRepository(DBBackupSettings));
};
