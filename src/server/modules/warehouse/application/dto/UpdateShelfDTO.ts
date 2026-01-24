import { z } from "zod";
import { shelfDTOSchema } from "./shared/ShelfDTO";
import { fullShelfIdentificationDTOSchema } from "./shared/FullShelfIdentificationDTO";

export const updateShelfDTOSchema = z.object({
	shelf: fullShelfIdentificationDTOSchema,
	newData: shelfDTOSchema.omit({
		id: true,
		cells: true,
		lastRecordedLegalWeightKg: true,
		temperatureReadingIds: true,
		hasBeenChangedIllegally: true,
	}),
});

export type UpdateShelfDTO = z.infer<typeof updateShelfDTOSchema>;
