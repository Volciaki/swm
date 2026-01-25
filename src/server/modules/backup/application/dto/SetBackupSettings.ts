import { z } from "zod";

export const setBackupSettingsDTOSchema = z.object({
	takeBackupsEverySeconds: z.number(),
});

export type SetBackupSettingsDTO = z.infer<typeof setBackupSettingsDTOSchema>;
