import { z } from "zod";

export const getFileDTOSchema = z.object({
	id: z.string(),
});

export type GetFileDTO = z.infer<typeof getFileDTOSchema>;
