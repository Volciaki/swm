import { z } from "zod";

export const dimensionsDTOSchema = z.object({
    widthMillimeters: z.number(),
    heightMillimeters: z.number(),
    lengthMillimeters: z.number(),
});

export type DimensionsDTO = z.infer<typeof dimensionsDTOSchema>;
