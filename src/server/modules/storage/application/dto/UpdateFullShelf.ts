import z from "zod";
import { updateShelfDTOSchema } from "./shared/UpdateShelfDTOSchema";

export const updateFullShelfDTOSchema = z.object({
	shelfId: z.string(),
	newData: updateShelfDTOSchema,
});

export type UpdateFullShelfDTO = z.infer<typeof updateFullShelfDTOSchema>;
