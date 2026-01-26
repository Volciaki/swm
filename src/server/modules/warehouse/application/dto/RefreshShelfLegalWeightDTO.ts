import type { z } from "zod";
import { fullShelfIdentificationDTOSchema } from "./shared/FullShelfIdentificationDTO";

export const refreshShelfLegalWeightDTOSchema = fullShelfIdentificationDTOSchema;

export type RefreshShelfLegalWeightDTO = z.infer<typeof refreshShelfLegalWeightDTOSchema>;
