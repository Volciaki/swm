import { DBBackupRepository } from "@/server/modules/backup/infrastructure/persistence/DBBackupRepository";
import { DBBackup } from "@/server/modules/backup/infrastructure/entities/DBBackup";
import { GetServicesContext } from "../../context";

export const getDBBackupRepository = (ctx: GetServicesContext): DBBackupRepository => {
	return new DBBackupRepository(ctx.db.getRepository(DBBackup));
};
