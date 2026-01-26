import { z } from "zod";
import { fileReferenceDTOSchema } from "@/server/utils/files/application/dto/shared/FileReferenceDTO";

export const reportDTOSchema = z.object({
	id: z.string(),
	type: z.string(),
	generationDateTimestamp: z.number(),
	file: fileReferenceDTOSchema,
});

export type ReportDTO = z.infer<typeof reportDTOSchema>;
