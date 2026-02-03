import { z } from "zod";

export const putUpAssortmentDTOSchema = z.object({
	shelfId: z.string(),
	cellId: z.string(),
	assortmentDefinitionId: z.string(),
});

export type PutUpAssortmentDTO = z.infer<typeof putUpAssortmentDTOSchema>;
