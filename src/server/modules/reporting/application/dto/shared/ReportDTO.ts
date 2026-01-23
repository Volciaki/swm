import { fileReferenceDTOSchema } from "@/server/utils/files/application/dto/shared/FileReferenceDTO";
import { z } from "zod";

export const reportDTOSchema = z.object({
	id: z.string(),
	type: z.string(),
	generationDateTimestamp: z.number(),
	file: fileReferenceDTOSchema,
});

export type ReportDTO = z.infer<typeof reportDTOSchema>;
