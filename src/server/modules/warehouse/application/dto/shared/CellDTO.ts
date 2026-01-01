import { z } from "zod";

export const cellDTOSchema = z.object({
    id: z.string(),
    shelfId: z.string(),
    assortmentId: z.union([z.string(), z.null()])
});

export type CellDTO = z.infer<typeof cellDTOSchema>;
