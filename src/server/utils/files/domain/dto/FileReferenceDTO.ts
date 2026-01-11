import { z } from "zod";

export const fileReferenceDTOSchema = z.object({
	id: z.string(),
	sizeBytes: z.number(),
	mimeType: z.string(),
	path: z.string(),
	visibility: z.object({
		isPublic: z.boolean(),
		publicUrl: z.union([z.string(), z.null()]),
	}),
});
