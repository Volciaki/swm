import { z } from "zod";

export const applyBackupByIdDTOSchema = z.object({
	id: z.string(),
});

export type ApplyBackupByIdDTO = z.infer<typeof applyBackupByIdDTOSchema>;
