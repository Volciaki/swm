import { z } from "zod";
import { shelfDTOSchema } from "./ShelfDTO";

export const updateShelfDTOSchema = shelfDTOSchema.omit({
	id: true,
	cells: true,
	lastRecordedLegalWeightKg: true,
});

export type UpdateShelfDTO = z.infer<typeof updateShelfDTOSchema>;
