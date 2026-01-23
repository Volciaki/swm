import { z } from "zod";
import { shelfVO } from "./ShelfVO";

export const temperatureReadingVO = z.object({
	id: z.string(),
	shelf: shelfVO.omit({ assortments: true }),
	dateTimestamp: z.number(),
	temperatureCelsius: z.number(),
	temperatureWasTooLow: z.boolean(),
	temperatureWasTooHigh: z.boolean(),
});

export type TemperatureReadingVO = z.infer<typeof temperatureReadingVO>;
