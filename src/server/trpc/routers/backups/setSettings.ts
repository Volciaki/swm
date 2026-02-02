import { setBackupSettingsDTOSchema } from "@/server/modules/backup/application/dto/SetBackupSettings";
import { SetBackupSettings } from "@/server/modules/backup/application/use-cases/SetBackupSettings";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const setSettings = procedure.input(setBackupSettingsDTOSchema).mutation(async ({ input, ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const backupSettingsHelper = presets.backupSettingsHelper.default;
	const backupSettingsRepository = services.repositories.backupSettings.db;

	const action = new SetBackupSettings(backupSettingsHelper, backupSettingsRepository);
	return await action.execute(input, ctx.user ?? undefined);
});
