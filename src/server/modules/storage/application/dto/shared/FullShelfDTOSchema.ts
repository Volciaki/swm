import type { z } from "zod";
import { shelfDTOSchema } from "./ShelfDTO";
import { fullCellDTOSchema } from "./FullCellDTOSchema";

export const fullShelfDTOSchema = shelfDTOSchema.omit({ cells: true }).extend({
	cells: fullCellDTOSchema.array().array(),
});

export type FullShelfDTO = z.infer<typeof fullShelfDTOSchema>;
