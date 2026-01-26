import type { z } from "zod";
import { fullShelfIdentificationDTOSchema } from "./shared/FullShelfIdentificationDTO";

export const deleteShelfDTOSchema = fullShelfIdentificationDTOSchema;

export type DeleteShelfDTO = z.infer<typeof deleteShelfDTOSchema>;
