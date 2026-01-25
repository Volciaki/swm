import { z } from "zod";
import { fileMetadataDTOSchema } from "./shared/FileMetadataDTO";

export const uploadFileDTOSchema = z.object({
	path: z.string(),
	mimeType: z.string(),
	contentBase64: z.string(),
	metadata: fileMetadataDTOSchema.omit({ storageType: true }),
	isEncrypted: z.boolean(),
});

export type UploadFileDTO = z.infer<typeof uploadFileDTOSchema>;
