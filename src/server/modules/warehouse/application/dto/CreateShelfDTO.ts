import { z } from "zod";
import { shelfDTOSchema } from "./shared/ShelfDTO";

export const createShelfDTOSchema = shelfDTOSchema
    .omit({ id: true, cells: true })
    .extend({
        cellsShape: z.object({
            columns: z.number(),
            rows: z.number(),
        }),
    });

export type CreateShelfDTO = z.infer<typeof createShelfDTOSchema>;
