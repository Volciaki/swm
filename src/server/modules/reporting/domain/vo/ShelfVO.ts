import { z } from "zod";
import { dimensionsDTOSchema, temperatureRangeDTOSchema } from "@/server/utils";
import { assortmentVOSchema } from "./AssortmentVO";

export const shelfVO = z.object({
	id: z.string(),
	name: z.string(),
	comment: z.string(),
	temperatureRange: temperatureRangeDTOSchema,
	maxWeightKg: z.number(),
	maxAssortmentSize: dimensionsDTOSchema,
	supportsHazardous: z.boolean(),
	lastRecordedLegalWeightKg: z.number(),
	currentTemperatureCelsius: z.number(),
	assortments: assortmentVOSchema.array(),
});

export type ShelfVO = z.infer<typeof shelfVO>;
