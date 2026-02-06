import { z } from "zod";
import { shelfDTOSchema } from "./ShelfDTO";

export const weightReadingDTOSchema = z.object({
	id: z.string(),
	shelf: shelfDTOSchema,
	dateTimestamp: z.number(),
	weightKilograms: z.number(),
});

export type WeightReadingDTO = z.infer<typeof weightReadingDTOSchema>;
