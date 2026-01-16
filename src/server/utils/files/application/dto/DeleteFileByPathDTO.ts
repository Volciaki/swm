import { z } from "zod";
import { fileMetadataDTOSchema } from "./shared/FileMetadataDTO";

export const deleteFileByPathDTOSchema = z.object({
	path: z.string(),
	metadata: fileMetadataDTOSchema.omit({ storageType: true }),
});

export type DeleteFileByPathDTO = z.infer<typeof deleteFileByPathDTOSchema>;
