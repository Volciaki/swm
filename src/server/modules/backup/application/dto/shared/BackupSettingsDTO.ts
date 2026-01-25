import { z } from "zod";

export const backupSettingsDTOSchema = z.object({
	id: z.string(),
	takeBackupsEverySeconds: z.number(),
});

export type BackupSettingsDTO = z.infer<typeof backupSettingsDTOSchema>;
