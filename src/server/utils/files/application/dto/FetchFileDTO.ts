import { z } from "zod";

export const fetchFileDTOSchema = z.object({
	id: z.string(),
});

export type FetchFileDTO = z.infer<typeof fetchFileDTOSchema>;
