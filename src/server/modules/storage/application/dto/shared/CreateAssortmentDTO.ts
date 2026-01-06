import { z } from "zod";
import { assortmentDTOSchema } from "./AssortmentDTO";

export const createAssortmentDTOSchema = assortmentDTOSchema.omit({
    id: true,
    cellId: true,
    shelfId: true,
    storedAtTimestamp: true,
});

export type CreateAssortmentDTO = z.infer<typeof createAssortmentDTOSchema>;
