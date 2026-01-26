import type { z } from "zod";
import { fullShelfIdentificationDTOSchema } from "./shared/FullShelfIdentificationDTO";

export const getShelfDTOSchema = fullShelfIdentificationDTOSchema;

export type GetShelfDTO = z.infer<typeof getShelfDTOSchema>;
