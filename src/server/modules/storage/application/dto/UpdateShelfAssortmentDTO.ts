import { z } from "zod";
import { updateAssortmentDTOSchema } from "./shared/UpdateAssortmentDTO";

export const updateShelfAssortmentDTOSchema = z.object({
	id: z.string(),
	newData: updateAssortmentDTOSchema,
});

export type UpdateShelfAssortmentDTO = z.infer<typeof updateShelfAssortmentDTOSchema>;
