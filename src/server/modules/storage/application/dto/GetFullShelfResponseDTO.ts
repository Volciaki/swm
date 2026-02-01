import type { z } from "zod";
import { fullShelfDTOSchema } from "./shared/FullShelfDTOSchema";

export const getFullShelfResponseDTOSchema = fullShelfDTOSchema;

export type GetFullShelfResponseDTO = z.infer<typeof getFullShelfResponseDTOSchema>;
