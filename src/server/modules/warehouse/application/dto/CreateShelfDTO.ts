import { z } from "zod";
import { shelfDTOSchema } from "./shared/ShelfDTO";

export const createShelfDTOSchema = shelfDTOSchema.omit({ id: true });

export type CreateShelfDTO = z.infer<typeof createShelfDTOSchema>;
