import { z } from "zod";
import { assortmentDTOSchema } from "./shared/AssortmentDTO";

export const createAssortmentDTOSchema = assortmentDTOSchema.omit({ id: true, storedAtTimestamp: true });

export type CreateAssortmentDTO = z.infer<typeof createAssortmentDTOSchema>;
