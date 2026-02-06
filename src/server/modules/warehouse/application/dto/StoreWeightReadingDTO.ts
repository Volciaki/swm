import type { z } from "zod";
import { fullShelfIdentificationDTOSchema } from "./shared/FullShelfIdentificationDTO";

export const storeWeightReadingDTOSchema = fullShelfIdentificationDTOSchema;

export type StoreWeightReadingDTO = z.infer<typeof storeWeightReadingDTOSchema>;
