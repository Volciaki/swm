import { z } from "zod";
import { assortmentDTOSchema } from "./shared/AssortmentDTO";

export const updateAssortmentDTOSchema = z.object({
    id: z.string(),
    newData: assortmentDTOSchema.omit({
        id: true,
        cellId: true,
        shelfId: true,
        storedAtTimestamp: true,
    }),
});


export type UpdateAssortmentDTO = z.infer<typeof updateAssortmentDTOSchema>;
