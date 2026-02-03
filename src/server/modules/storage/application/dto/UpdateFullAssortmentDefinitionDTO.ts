import type { z } from "zod";
import { updateAssortmentDTOSchema } from "./shared/UpdateAssortmentDTO";

export const updateFullAssortmentDefinitionDTOSchema = updateAssortmentDTOSchema;

export type UpdateFullAssortmentDefinitionDTO = z.infer<typeof updateFullAssortmentDefinitionDTOSchema>;
