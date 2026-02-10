import { z } from "zod";
import { fileMetadataDTOSchema } from "./shared/FileMetadataDTO";

export const createFileReferenceDTOSchema = z.object({
	path: z.string(),
	metadata: fileMetadataDTOSchema.omit({ storageType: true }),
	mimeType: z.string(),
	isEncrypted: z.boolean(),
});

export type CreateFileReferenceDTO = z.infer<typeof createFileReferenceDTOSchema>;
