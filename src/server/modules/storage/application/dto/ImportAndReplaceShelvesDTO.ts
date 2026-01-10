import { z } from "zod";
import { createShelfDTOSchema } from "./shared/CreateShelfDTO";

export const importAndReplaceShelvesDTOSchema = z.object({
	shelves: createShelfDTOSchema.array(),
});

export type ImportAndReplaceShelvesDTO = z.infer<typeof importAndReplaceShelvesDTOSchema>;
