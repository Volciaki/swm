import { z } from "zod";

export const createAssortmentDTOSchema = z.object({
	cellId: z.string(),
	shelfId: z.string(),
	definitionId: z.string(),
});

export type CreateAssortmentDTO = z.infer<typeof createAssortmentDTOSchema>;
