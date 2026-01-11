import { z } from "zod";

export const putUpAssortmentCopyDTOSchema = z.object({
	id: z.string(),
});

export type PutUpAssortmentCopyDTO = z.infer<typeof putUpAssortmentCopyDTOSchema>;
