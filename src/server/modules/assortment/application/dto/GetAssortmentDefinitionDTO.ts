import { z } from "zod";

export const getAssortmentDefinitionDTOSchema = z.object({
	id: z.string(),
});

export type GetAssortmentDefinitionDTO = z.infer<typeof getAssortmentDefinitionDTOSchema>;
