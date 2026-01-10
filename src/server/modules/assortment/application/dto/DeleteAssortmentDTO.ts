import { z } from "zod";

export const deleteAssortmentDTOSchema = z.object({
	id: z.string(),
});

export type DeleteAssortmentDTO = z.infer<typeof deleteAssortmentDTOSchema>;
