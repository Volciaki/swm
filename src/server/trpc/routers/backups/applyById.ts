import { ApplyBackupById } from "@/server/modules/backup/application/use-cases/ApplyBackupById";
import { applyBackupByIdDTOSchema } from "@/server/modules/backup/application/dto/ApplyBackupByIdDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const applyById = procedure.input(applyBackupByIdDTOSchema).mutation<void>(async ({ ctx, input }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const backupHelper = presets.backupHelper.default;

	const action = new ApplyBackupById(backupHelper);
	return await action.execute(input, ctx.user ?? undefined);
});
