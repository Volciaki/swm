import { z } from "zod";
import { assortmentVOSchema } from "../../domain/vo/AssortmentVO";

export const fillCellDTOSchema = z.object({
    shelfId: z.string(),
    cellId: z.string(),
    assortment: assortmentVOSchema,
});

export type FillCellDTO = z.infer<typeof fillCellDTOSchema>;
