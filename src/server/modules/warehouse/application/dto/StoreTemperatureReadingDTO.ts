import type { z } from "zod";
import { fullShelfIdentificationDTOSchema } from "./shared/FullShelfIdentificationDTO";

export const storeTemperatureReadingDTOSchema = fullShelfIdentificationDTOSchema;

export type StoreTemperatureReadingDTO = z.infer<typeof storeTemperatureReadingDTOSchema>;
