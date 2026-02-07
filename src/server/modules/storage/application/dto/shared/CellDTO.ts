import { z } from "zod";
import { assortmentVOSchema } from "./AssortmentVO";

export const cellDTOSchema = z.object({
	id: z.string(),
	shelfId: z.string(),
	assortment: assortmentVOSchema.nullable(),
	x: z.number(),
	y: z.number(),
	index: z.number(),
});

export type CellDTO = z.infer<typeof cellDTOSchema>;
