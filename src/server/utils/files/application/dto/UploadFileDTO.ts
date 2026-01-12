import { z } from "zod";

export const uploadFileDTOSchema = z.object({
	path: z.string(),
	base64Content: z.string(),
	mimeType: z.string(),
});

export type UploadFileDTO = z.infer<typeof uploadFileDTOSchema>;
