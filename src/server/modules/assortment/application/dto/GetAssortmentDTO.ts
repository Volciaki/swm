import { z } from "zod";

export const getAssortmentDTOSchema = z.object({
    id: z.string(),
});

export type GetAssortmentDTO = z.infer<typeof getAssortmentDTOSchema>;
