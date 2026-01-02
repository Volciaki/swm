import { z } from "zod";
import { assortmentVOSchema } from "../../../domain/vo/AssortmentVO";

export const cellDTOSchema = z.object({
    id: z.string(),
    shelfId: z.string(),
    assortment: z.union([assortmentVOSchema, z.null()]),
});

export type CellDTO = z.infer<typeof cellDTOSchema>;
