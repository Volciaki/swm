import { z } from "zod";
import { assortmentDTOSchema } from "../../../domain/dto/AssortmentDTO";

export const cellDTOSchema = z.object({
    id: z.string(),
    shelfId: z.string(),
    assortment: z.union([assortmentDTOSchema, z.null()]),
});

export type CellDTO = z.infer<typeof cellDTOSchema>;
