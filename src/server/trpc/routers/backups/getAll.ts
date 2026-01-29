import { GetAllBackups } from "@/server/modules/backup/application/use-cases/GetAllBackups";
import type { BackupDTO } from "@/server/modules/backup/application/dto/shared/BackupDTO";
import { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const getAll = procedure.query<BackupDTO[]>(async ({ ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const backupRepository = services.repositories.backup.db;
	const fileHelper = presets.fileHelper.default;

	const getFile = new GetFile(fileHelper);

	const action = new GetAllBackups(backupRepository, getFile);
	return await action.execute(undefined, ctx.user ?? undefined);
});
