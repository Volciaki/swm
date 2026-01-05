import { z } from "zod";

export const validateShelfDTOSchema = z.object({
    id: z.string(),
});

export type ValidateShelfDTO = z.infer<typeof validateShelfDTOSchema>;
