import { dimensionsDTOSchema, temperatureRangeDTOSchema } from "@/server/utils";
import { z } from "zod";

export const updateAssortmentDTOSchema = z.object({
	id: z.string(),
	newData: z.object({
		name: z.string(),
		temperatureRange: temperatureRangeDTOSchema,
		weightKg: z.number(),
		size: dimensionsDTOSchema,
		comment: z.string(),
		expiresAfterSeconds: z.number(),
		isHazardous: z.boolean(),
		imageContentBase64: z.string().nullable(),
	}),
});

export type UpdateAssortmentDTO = z.infer<typeof updateAssortmentDTOSchema>;
