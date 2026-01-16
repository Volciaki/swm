import { z } from "zod";
import { fileMetadataDTOSchema } from "./shared/FileMetadataDTO";

export const fetchFileDTOSchema = z.object({
	id: z.string(),
	metadata: fileMetadataDTOSchema.omit({ storageType: true }),
});

export type FetchFileDTO = z.infer<typeof fetchFileDTOSchema>;
