import { dimensionsDTOSchema, temperatureRangeDTOSchema } from "@/server/utils";
import z from "zod";

const updateShelfDTOSchema = z.object({
    name: z.string(),
    comment: z.string(),
    temperatureRange: temperatureRangeDTOSchema,
    maxWeightKg: z.number(),
    maxAssortmentSize: dimensionsDTOSchema,
    supportsHazardous: z.boolean(),
});

export const updateFullShelfDTOSchema = z.object({
    shelfId: z.string(),
    newData: updateShelfDTOSchema,
});

export type UpdateFullShelfDTO = z.infer<typeof updateFullShelfDTOSchema>;
