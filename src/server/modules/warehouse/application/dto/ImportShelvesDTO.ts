import { z } from "zod";
import { createShelfDTOSchema } from "./shared/CreateShelfDTO";

export const importShelvesDTOSchema = z.object({
	shelves: createShelfDTOSchema.array(),
});

export type ImportShelvesDTO = z.infer<typeof importShelvesDTOSchema>;
