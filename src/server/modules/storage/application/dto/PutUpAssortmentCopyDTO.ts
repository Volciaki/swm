import { z } from "zod";

export const putUpAssortmentCopyDTOSchema = z.object({
	assortmentId: z.string(),
});

export type PutUpAssortmentCopyDTO = z.infer<typeof putUpAssortmentCopyDTOSchema>;
