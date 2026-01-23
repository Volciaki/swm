import { z } from "zod";
import { shelfDTOSchema } from "./ShelfDTO";

export const temperatureReadingDTOSchema = z.object({
	id: z.string(),
	shelf: shelfDTOSchema,
	dateTimestamp: z.number(),
	temperatureCelsius: z.number(),
	temperatureWasTooLow: z.boolean(),
	temperatureWasTooHigh: z.boolean(),
});

export type TemperatureReadingDTO = z.infer<typeof temperatureReadingDTOSchema>;
