import { z } from "zod";

export const uploadFileDTOSchema = z.object({
	path: z.string(),
	mimeType: z.string(),
	contentBase64: z.string(),
});

export type UploadFileDTO = z.infer<typeof uploadFileDTOSchema>;
