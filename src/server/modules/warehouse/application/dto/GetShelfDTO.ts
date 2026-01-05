import { z } from "zod";
import { assortmentVOSchema } from "../../domain/vo/AssortmentVO";

export const getShelfDTOSchema = z.object({
    id: z.string(),
    assortmentContext: assortmentVOSchema.array(),
});

export type GetShelfDTO = z.infer<typeof getShelfDTOSchema>;
