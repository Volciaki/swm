import { z } from "zod";
import { temperatureReadingDTOSchema } from "./shared/TemperatureReadingDTO";

export const storeTemperatureReadingResponseDTOSchema = temperatureReadingDTOSchema;

export type StoreTemperatureReadingResponseDTO = z.infer<typeof storeTemperatureReadingResponseDTOSchema>;
