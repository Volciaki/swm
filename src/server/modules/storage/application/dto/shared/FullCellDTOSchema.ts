import { z } from "zod";
import { assortmentDTOSchema } from "./AssortmentDTO";

export const fullCellDTOSchema = z.object({
	id: z.string(),
	shelfId: z.string(),
	assortment: assortmentDTOSchema.nullable(),
	x: z.number(),
	y: z.number(),
	index: z.number(),
});

export type FullCellDTO = z.infer<typeof fullCellDTOSchema>;
