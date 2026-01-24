import { z } from "zod";
import { dimensionsDTOSchema, temperatureRangeDTOSchema } from "@/server/utils";

export const createAssortmentDTOSchema = z.object({
	cellId: z.string(),
	shelfId: z.string(),
	name: z.string(),
	temperatureRange: temperatureRangeDTOSchema,
	weightKg: z.number(),
	size: dimensionsDTOSchema,
	comment: z.string(),
	expiresAfterSeconds: z.number(),
	isHazardous: z.boolean(),
	imageContentBase64: z.string().nullable(),
});

export type CreateAssortmentDTO = z.infer<typeof createAssortmentDTOSchema>;
