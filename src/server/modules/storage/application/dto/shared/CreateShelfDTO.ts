import { z } from "zod";
import { shelfDTOSchema } from "./ShelfDTO";

export const createShelfDTOSchema = shelfDTOSchema
	.omit({
		id: true,
		cells: true,
		lastRecordedLegalWeightKg: true,
		temperatureReadingIds: true,
		weightReadingIds: true,
		hasBeenChangedIllegally: true,
		currentTemperatureCelsius: true,
		currentWeightKilograms: true,
	})
	.extend({
		cellsShape: z.object({
			columns: z.number(),
			rows: z.number(),
		}),
	});

export type CreateShelfDTO = z.infer<typeof createShelfDTOSchema>;
