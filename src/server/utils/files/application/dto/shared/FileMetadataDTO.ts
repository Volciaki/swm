import { z } from "zod";

export const fileMetadataDTOSchema = z.object({
	storageType: z.string(),
	bucket: z.string().nullable(),
});

export type FileMetadataDTO = z.infer<typeof fileMetadataDTOSchema>;
