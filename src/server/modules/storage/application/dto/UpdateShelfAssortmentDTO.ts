import { z } from "zod";
import { assortmentDTOSchema } from "./shared/AssortmentDTO";

const updateAssortmentDTOSchema = assortmentDTOSchema.omit({
    id: true,
    cellId: true,
    shelfId: true,
    storedAtTimestamp: true,
});

export const updateShelfAssortmentDTOSchema = z.object({
    id: z.string(),
    newData: updateAssortmentDTOSchema,
});

export type UpdateShelfAssortmentDTO = z.infer<typeof updateShelfAssortmentDTOSchema>;
