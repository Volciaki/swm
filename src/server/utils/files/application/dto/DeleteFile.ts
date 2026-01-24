import { z } from "zod";

export const deleteFileDTOSchema = z.object({
	id: z.string(),
});

export type DeleteFileDTO = z.infer<typeof deleteFileDTOSchema>;
