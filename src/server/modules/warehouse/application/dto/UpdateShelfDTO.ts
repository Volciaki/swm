import { z } from "zod";
import { shelfDTOSchema } from "./shared/ShelfDTO";

export const updateShelfDTOSchema = z.object({
    id: z.string(),
    newData: shelfDTOSchema.omit({ id: true, cells: true }),
});

export type UpdateShelfDTO = z.infer<typeof updateShelfDTOSchema>;
