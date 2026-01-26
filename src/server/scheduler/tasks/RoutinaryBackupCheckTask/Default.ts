import type { GetServicesContext } from "@/server/trpc/services/context";
import { RoutinaryBackupCheckTask } from "@/server/modules/backup/infrastructure/schedule/RoutinaryBackupCheckTask";
import { GetAllBackups } from "@/server/modules/backup/application/use-cases/GetAllBackups";
import { GetBackupSettings } from "@/server/modules/backup/application/use-cases/GetBackupSettings";
import { TakeBackup } from "@/server/modules/backup/application/use-cases/TakeBackup";
import { getPresets, getServices } from "@/server/trpc/services";
import { GetFile } from "@/server/utils/files/application/use-cases/GetFile";

export const getDefaultRoutinaryBackupCheck = (ctx: GetServicesContext) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const backupRepository = services.repositories.backup.db;
	const fileHelper = presets.fileHelper.default;
	const backupSettingsHelper = presets.backupSettingsHelper.default;
	const backupHelper = presets.backupHelper.default;

	const getFile = new GetFile(fileHelper);

	const getAllBackups = new GetAllBackups(backupRepository, getFile);
	const getBackupSettings = new GetBackupSettings(backupSettingsHelper);
	const takeBackup = new TakeBackup(backupHelper);

	return new RoutinaryBackupCheckTask(getAllBackups, getBackupSettings, takeBackup);
};
