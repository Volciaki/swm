import { z } from "zod";

export const assortmentDTOSchema = z.object({
    name: z.string(),
    id: z.string(),
    // TODO: ???
    // qrCode: z.string(),
    // image: z.string(),
    temperatureRange: z.object({
        minimalCelsius: z.number(),
        maximalCelsius: z.number(),
    }),
    weightKg: z.number(),
    dimensions: z.object({
        widthMillimeters: z.number(),
        lengthMillimeters: z.number(),
        heightMillimeters: z.number(),
    }),
    isHazardous: z.boolean(),
});

export type AssortmentDTO = z.infer<typeof assortmentDTOSchema>;
