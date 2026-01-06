import { z } from "zod";
import { createAssortmentDTOSchema } from "./shared/CreateAssortmentDTO";

export const putUpAssortmentDTOSchema = z.object({
    shelfId: z.string(),
    cellId: z.string(),
    assortment: createAssortmentDTOSchema,
});

export type PutUpAssortmentDTO = z.infer<typeof putUpAssortmentDTOSchema>;
