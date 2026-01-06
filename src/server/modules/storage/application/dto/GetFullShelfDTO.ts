import { z } from "zod";

export const getFullShelfDTOSchema = z.object({
    id: z.string(),
});

export type GetFullShelfDTO = z.infer<typeof getFullShelfDTOSchema>;
