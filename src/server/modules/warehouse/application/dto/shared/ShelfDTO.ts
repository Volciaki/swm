import { z } from "zod";
import { dimensionsDTOSchema, temperatureRangeDTOSchema } from "@/server/utils";
import { cellDTOSchema } from "./CellDTO";

export const shelfDTOSchema = z.object({
    id: z.string(),
    name: z.string(),
    comment: z.string(),
    rows: z.array(cellDTOSchema),
    columns: z.array(cellDTOSchema),
    temperatureRange: temperatureRangeDTOSchema,
    maxWeightKg: z.number(),
    maxAssortmentSize: dimensionsDTOSchema,
    supportsHazardous: z.boolean(),
});

export type ShelfDTO = z.infer<typeof shelfDTOSchema>;
