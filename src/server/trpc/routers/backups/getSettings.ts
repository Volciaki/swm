import type { BackupSettingsDTO } from "@/server/modules/backup/application/dto/shared/BackupSettingsDTO";
import { GetBackupSettings } from "@/server/modules/backup/application/use-cases/GetBackupSettings";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const getSettings = procedure.query<BackupSettingsDTO>(async ({ ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const backupSettingsHelper = presets.backupSettingsHelper.default;

	const action = new GetBackupSettings(backupSettingsHelper);
	return await action.execute(undefined, ctx.user ?? undefined);
});
