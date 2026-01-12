import { z } from "zod";
import { visibilityDTOSchema } from "./VisbilityDTO";

export const fileReferenceDTOSchema = z.object({
	id: z.string(),
	sizeBytes: z.number(),
	mimeType: z.string(),
	path: z.string(),
	visibility: visibilityDTOSchema,
});

export type FileReferenceDTO = z.infer<typeof fileReferenceDTOSchema>;
