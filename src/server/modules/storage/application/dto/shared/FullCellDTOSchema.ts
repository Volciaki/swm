import { z } from "zod";
import { assortmentDTOSchema } from "./AssortmentDTO";

export const fullCellDTOSchema = z.object({
	id: z.string(),
	shelfId: z.string(),
	assortment: assortmentDTOSchema.nullable(),
});

export type FullCellDTO = z.infer<typeof fullCellDTOSchema>;
