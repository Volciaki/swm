import { z } from "zod";
import { dimensionsDTOSchema, temperatureRangeDTOSchema } from "@/server/utils";

export const assortmentDTOSchema = z.object({
    id: z.string(),
    cellId: z.string(),
    shelfId: z.string(),
    name: z.string(),
    // TODO: Think what to do about those.
    // qrCode: z.string(),
    // image: z.string(),
    temperatureRange: temperatureRangeDTOSchema,
    weightKg: z.number(),
    size: dimensionsDTOSchema,
    comment: z.string(),
    storedAtTimestamp: z.number(),
    expiresAfterSeconds: z.number(),
    isHazardous: z.boolean(),
});

export type AssortmentDTO = z.infer<typeof assortmentDTOSchema>;
