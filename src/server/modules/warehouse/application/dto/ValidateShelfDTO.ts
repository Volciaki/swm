import { z } from "zod";
import { fullShelfIdentificationDTOSchema } from "./shared/FullShelfIdentificationDTO";

export const validateShelfDTOSchema = fullShelfIdentificationDTOSchema;

export type ValidateShelfDTO = z.infer<typeof validateShelfDTOSchema>;
