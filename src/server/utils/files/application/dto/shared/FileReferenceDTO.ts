import { z } from "zod";
import { visibilityDTOSchema } from "./VisbilityDTO";
import { fileMetadataDTOSchema } from "./FileMetadataDTO";

export const fileReferenceDTOSchema = z.object({
	id: z.string(),
	sizeBytes: z.number(),
	mimeType: z.string(),
	path: z.string(),
	visibility: visibilityDTOSchema,
	metadata: fileMetadataDTOSchema,
});

export type FileReferenceDTO = z.infer<typeof fileReferenceDTOSchema>;
