import { z } from "zod";
import { assortmentDTOSchema } from "@/server/modules/storage/application/dto/shared/AssortmentDTO";

const createAssortmentDTOSchema = assortmentDTOSchema.omit({
    id: true,
    cellId: true,
    shelfId: true,
    storedAtTimestamp: true,
});

export const putUpAssortmentDTOSchema = z.object({
    shelfId: z.string(),
    cellId: z.string(),
    assortment: createAssortmentDTOSchema,
});

export type PutUpAssortmentDTO = z.infer<typeof putUpAssortmentDTOSchema>;
