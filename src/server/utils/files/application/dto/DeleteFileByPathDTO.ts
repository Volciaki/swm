import { z } from "zod";

export const deleteFileByPathDTOSchema = z.object({
	path: z.string(),
});

export type DeleteFileByPathDTO = z.infer<typeof deleteFileByPathDTOSchema>;
