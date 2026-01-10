import { z } from "zod";
import { fullShelfIdentificationDTOSchema } from "./shared/FullShelfIdentificationDTO";

export const emptyCellDTOSchema = z.object({
	shelf: fullShelfIdentificationDTOSchema,
	cellId: z.string(),
});

export type EmptyCellDTO = z.infer<typeof emptyCellDTOSchema>;
