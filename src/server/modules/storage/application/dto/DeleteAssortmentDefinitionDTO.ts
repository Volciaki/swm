import { z } from "zod";

export const deleteAssortmentDefinitionDTOSchema = z.object({
	id: z.string(),
});

export type DeleteAssortmentDefinitionDTO = z.infer<typeof deleteAssortmentDefinitionDTOSchema>;
