import { z } from "zod";
import { shelfDTOSchema } from "./shared/ShelfDTO";
import { assortmentDTOSchema } from "./shared/AssortmentDTO";

export const putUpAssortmentResponseDTOSchema = z.object({
	newAssortment: assortmentDTOSchema,
	shelf: shelfDTOSchema,
});

export type PutUpAssortmentResponseDTO = z.infer<typeof putUpAssortmentResponseDTOSchema>;
