import type { z } from "zod";
import { weightReadingDTOSchema } from "./shared/WeightReadingDTO";

export const storeWeightReadingResponseDTOSchema = weightReadingDTOSchema;

export type StoreWeightReadingResponseDTO = z.infer<typeof storeWeightReadingResponseDTOSchema>;
