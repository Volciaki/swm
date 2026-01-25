import { TakeBackupResponseDTO } from "@/server/modules/backup/application/dto/TakeBackupResponseDTO";
import { TakeBackup } from "@/server/modules/backup/application/use-cases/TakeBackup";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const take = procedure.mutation<TakeBackupResponseDTO>(async ({ ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const backupHelper = presets.backupHelper.default;

	const action = new TakeBackup(backupHelper);
	return await action.execute(undefined, ctx.user ?? undefined);
})
