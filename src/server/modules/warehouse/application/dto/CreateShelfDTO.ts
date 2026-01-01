import { z } from "zod";
import { shelfDTOSchema } from "./shared/ShelfDTO";
import { cellDTOSchema } from "./shared/CellDTO";

const createCellDTOSchema = cellDTOSchema.omit({
    id: true,
    shelfId: true,
});

export const createShelfDTOSchema = shelfDTOSchema
    .omit({
        id: true,
        rows: true,
        columns: true,
    })
    .extend({
        rows: z.array(createCellDTOSchema),
        columns: z.array(createCellDTOSchema),
    });

export type CreateShelfDTO = z.infer<typeof createShelfDTOSchema>;
