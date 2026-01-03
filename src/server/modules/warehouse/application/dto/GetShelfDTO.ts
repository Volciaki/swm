import { z } from "zod";

export const getShelfDTOSchema = z.object({
    id: z.string(),
});

export type GetShelfDTO = z.infer<typeof getShelfDTOSchema>;
