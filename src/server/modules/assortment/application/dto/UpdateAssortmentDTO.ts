import { z } from "zod";
import { dimensionsDTOSchema, temperatureRangeDTOSchema } from "@/server/utils";

export const updateAssortmentDefinitionDTOSchema = z.object({
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

export type UpdateAssortmentDefinitionDTO = z.infer<typeof updateAssortmentDefinitionDTOSchema>;
