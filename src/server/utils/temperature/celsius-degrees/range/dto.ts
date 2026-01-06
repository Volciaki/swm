import { z } from "zod";

export const temperatureRangeDTOSchema = z.object({
    minimalCelsius: z.number(),
    maximalCelsius: z.number(),
});

export type TemperatureRangeDTO = z.infer<typeof temperatureRangeDTOSchema>;
