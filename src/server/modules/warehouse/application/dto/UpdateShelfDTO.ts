import { z } from "zod";
import { shelfDTOSchema } from "./shared/ShelfDTO";
import { fullShelfIdentificationDTOSchema } from "./shared/FullShelfIdentificationDTO";

export const updateShelfDTOSchema = z.object({
    shelf: fullShelfIdentificationDTOSchema,
    newData: shelfDTOSchema.omit({ id: true, cells: true }),
});

export type UpdateShelfDTO = z.infer<typeof updateShelfDTOSchema>;
