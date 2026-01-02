import { dimensionsDTOSchema, temperatureRangeDTOSchema } from "@/server/utils";
import { z } from "zod";

// TODO: move this to `assortment` bounded cotnext later.
// export const assortmentDTOSchema = z.object({
//     name: z.string(),
//     id: z.string(),
//     // TODO: ???
//     // qrCode: z.string(),
//     // image: z.string(),
//     temperatureRange: temperatureRangeDTOSchema,
//     weightKg: z.number(),
//     dimensions: z.object({
//         widthMillimeters: z.number(),
//         lengthMillimeters: z.number(),
//         heightMillimeters: z.number(),
//     }),
//     isHazardous: z.boolean(),
// });
// Fields of `Assortment` from `assortment` bounded context, which we need to validate a `Shelf`.
export const assortmentVOSchema = z.object({
    id: z.string(),
    temperatureRange: temperatureRangeDTOSchema,
    weightKg: z.number(),
    dimensions: dimensionsDTOSchema,
    isHazardous: z.boolean(),
});


export type AssortmentVO = z.infer<typeof assortmentVOSchema>;
