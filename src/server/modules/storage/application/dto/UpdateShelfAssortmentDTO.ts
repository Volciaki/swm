import type { z } from "zod";
import { updateAssortmentDTOSchema } from "./shared/UpdateAssortmentDTO";

export const updateShelfAssortmentDTOSchema = updateAssortmentDTOSchema;

export type UpdateShelfAssortmentDTO = z.infer<typeof updateShelfAssortmentDTOSchema>;
