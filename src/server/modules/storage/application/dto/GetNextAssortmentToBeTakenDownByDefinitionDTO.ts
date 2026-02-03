import { z } from "zod";

export const getNextAssortmentToBeTakenDownByDefinitionDTOSchema = z.object({
	definitionId: z.string(),
});

export type GetNextAssortmentToBeTakenDownByDefinitionDTO = z.infer<
	typeof getNextAssortmentToBeTakenDownByDefinitionDTOSchema
>;
