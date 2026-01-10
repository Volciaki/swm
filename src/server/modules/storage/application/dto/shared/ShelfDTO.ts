import { z } from "zod";
import { temperatureRangeDTOSchema, dimensionsDTOSchema } from "@/server/utils";
import { cellDTOSchema } from "./CellDTO";

export const shelfDTOSchema = z.object({
	id: z.string(),
	name: z.string(),
	comment: z.string(),
	cells: cellDTOSchema.array().array(),
	temperatureRange: temperatureRangeDTOSchema,
	maxWeightKg: z.number(),
	maxAssortmentSize: dimensionsDTOSchema,
	supportsHazardous: z.boolean(),
});

export type ShelfDTO = z.infer<typeof shelfDTOSchema>;
