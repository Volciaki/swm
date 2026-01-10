import { z } from "zod";
import { assortmentDTOSchema } from "./AssortmentDTO";

export const updateAssortmentDTOSchema = assortmentDTOSchema.omit({
	id: true,
	cellId: true,
	shelfId: true,
	storedAtTimestamp: true,
});

export type UpdateAssortmentDTO = z.infer<typeof updateAssortmentDTOSchema>;
