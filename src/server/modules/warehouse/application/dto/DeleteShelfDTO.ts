import { z } from "zod";

export const deleteShelfDTOSchema = z.object({
    id: z.string(),
});

export type DeleteShelfDTO = z.infer<typeof deleteShelfDTOSchema>;
