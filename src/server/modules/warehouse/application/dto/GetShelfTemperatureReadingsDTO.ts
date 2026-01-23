import { z } from "zod";
import { fullShelfIdentificationDTOSchema } from "./shared/FullShelfIdentificationDTO";

export const getShelfTemperatureReadingsDTOSchema = fullShelfIdentificationDTOSchema;

export type GetShelfTemperatureReadingsDTO = z.infer<typeof getShelfTemperatureReadingsDTOSchema>;
