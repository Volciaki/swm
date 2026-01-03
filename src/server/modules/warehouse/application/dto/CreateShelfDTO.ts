import { z } from "zod";
import { shelfDTOSchema } from "./shared/ShelfDTO";
import { cellDTOSchema } from "./shared/CellDTO";

const createCellDTOSchema = cellDTOSchema.omit({
    id: true,
    shelfId: true,
});

export const createShelfDTOSchema = shelfDTOSchema
    .omit({ id: true, cells: true })
    .extend({ cells: createCellDTOSchema.array().array() });

export type CreateShelfDTO = z.infer<typeof createShelfDTOSchema>;
