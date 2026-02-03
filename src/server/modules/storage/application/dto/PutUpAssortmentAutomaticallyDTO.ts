import { z } from "zod";

export const putUpAssortmentAutomaticallyDTOSchema = z.object({
	definitionId: z.string(),
});

export type PutUpAssortmentAutomaticallyDTO = z.infer<typeof putUpAssortmentAutomaticallyDTOSchema>;
