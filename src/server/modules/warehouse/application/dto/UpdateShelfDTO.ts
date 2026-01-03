import { z } from "zod";
import { shelfDTOSchema } from "./shared/ShelfDTO";
import { cellDTOSchema } from "./shared/CellDTO";

export const updateCellDTOSchema = cellDTOSchema.omit({ shelfId: true });

export type UpdateCellDTO = z.infer<typeof updateCellDTOSchema>;

export const updateShelfDTOSchema = z.object({
    id: z.string(),
    newData: shelfDTOSchema
        .omit({ id: true, cells: true })
        .extend({ cells: updateCellDTOSchema.array().array() }),
});

export type UpdateShelfDTO = z.infer<typeof updateShelfDTOSchema>;
