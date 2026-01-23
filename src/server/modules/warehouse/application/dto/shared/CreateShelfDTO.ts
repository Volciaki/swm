import { z } from "zod";
import { shelfDTOSchema } from "./ShelfDTO";

export const createShelfDTOSchema = shelfDTOSchema
	.omit({
		id: true,
		cells: true,
		lastRecordedLegalWeightKg: true,
		currentTemperatureCelsius: true,
		hasBeenChangedIllegally: true,
		temperatureReadingIds: true,
	})
	.extend({
		cellsShape: z.object({
			columns: z.number(),
			rows: z.number(),
		}),
	});

export type CreateShelfDTO = z.infer<typeof createShelfDTOSchema>;
