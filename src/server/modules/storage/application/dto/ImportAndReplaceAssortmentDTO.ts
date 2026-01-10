import { z } from "zod";
import { createAssortmentDTOSchema } from "./shared/CreateAssortmentDTO";

export const importAndReplaceAssortmentDTOSchema = z.object({
	assortment: createAssortmentDTOSchema.array(),
});

export type ImportAndReplaceAssortmentDTO = z.infer<typeof importAndReplaceAssortmentDTOSchema>;
