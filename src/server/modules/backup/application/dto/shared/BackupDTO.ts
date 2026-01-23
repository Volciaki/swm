import { z } from "zod";
import { fileReferenceDTOSchema } from "@/server/utils/files/application/dto/shared/FileReferenceDTO";

export const backupDTOSchema = z.object({
	id: z.string(),
	dateTimestamp: z.number(),
	file: fileReferenceDTOSchema,
});

export type BackupDTO = z.infer<typeof backupDTOSchema>;
