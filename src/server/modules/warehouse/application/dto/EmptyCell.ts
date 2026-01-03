import { z } from "zod";

export const emptyCellDTOSchema = z.object({
    shelfId: z.string(),
    cellId: z.string(),
});

export type EmptyCellDTO = z.infer<typeof emptyCellDTOSchema>;
