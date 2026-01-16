import { z } from "zod";

export const visibilityDTOSchema = z.object({
	isPublic: z.boolean(),
	publicUrl: z.union([z.string(), z.null()]),
});

export type VisibilityDTO = z.infer<typeof visibilityDTOSchema>;
