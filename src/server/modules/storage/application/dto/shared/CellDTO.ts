import { z } from "zod";

export const cellDTOSchema = z.object({
    id: z.string(),
    shelfId: z.string(),
    assortment: z.object({
        id: z.string(),
    }),
});

export type CellDTO = z.infer<typeof cellDTOSchema>;
