import { z } from "zod";
import { createAssortmentDTOSchema } from "./shared/CreateAssortmentDTO";

export const importAssortmentDTOSchema = z.object({
    assortment: createAssortmentDTOSchema.array(),
});

export type ImportAssortmentDTO = z.infer<typeof importAssortmentDTOSchema>;
