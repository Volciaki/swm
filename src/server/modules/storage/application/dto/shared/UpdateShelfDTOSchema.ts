import { z } from "zod";
import { shelfDTOSchema } from "./ShelfDTO";

export const updateShelfDTOSchema = shelfDTOSchema.omit({
	id: true,
	cells: true,
	lastRecordedLegalWeightKg: true,
	temperatureReadingIds: true,
	hasBeenChangedIllegally: true,
	currentTemperatureCelsius: true,
});

export type UpdateShelfDTO = z.infer<typeof updateShelfDTOSchema>;
