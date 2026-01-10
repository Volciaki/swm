import { z } from "zod";
import { temperatureRangeDTOSchema, dimensionsDTOSchema } from "@/server/utils";

export const assortmentVOSchema = z.object({
	id: z.string(),
	temperatureRange: temperatureRangeDTOSchema,
	weightKg: z.number(),
	size: dimensionsDTOSchema,
	isHazardous: z.boolean(),
});

export type AssortmentVO = z.infer<typeof assortmentVOSchema>;
