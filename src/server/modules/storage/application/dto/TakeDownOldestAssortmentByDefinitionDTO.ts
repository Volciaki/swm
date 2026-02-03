import { z } from "zod";

export const takeDownOldestAssortmentByDefinitionDTOSchema = z.object({
	definitionId: z.string(),
});

export type TakeDownOldestAssortmentByDefinitionDTO = z.infer<typeof takeDownOldestAssortmentByDefinitionDTOSchema>;
