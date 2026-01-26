import type { z } from "zod";
import { temperatureReadingDTOSchema } from "./shared/TemperatureReadingDTO";

export const getShelfTemperatureReadingsResponseDTOSchema = temperatureReadingDTOSchema.array();

export type GetShelfTemperatureReadingsResponseDTO = z.infer<typeof getShelfTemperatureReadingsResponseDTOSchema>;
