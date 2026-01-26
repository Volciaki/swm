import { z } from "zod";
import { dimensionsDTOSchema, temperatureRangeDTOSchema } from "@/server/utils";

// Fields of `Assortment` from `assortment` bounded context, which we need to validate a `Shelf`.
export const assortmentVOSchema = z.object({
	id: z.string(),
	temperatureRange: temperatureRangeDTOSchema,
	weightKg: z.number(),
	size: dimensionsDTOSchema,
	isHazardous: z.boolean(),
});

export type AssortmentVO = z.infer<typeof assortmentVOSchema>;
