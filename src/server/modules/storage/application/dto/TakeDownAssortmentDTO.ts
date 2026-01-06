import { z } from "zod";

export const takeDownAssortmentDTOSchema = z.object({
    id: z.string(),
});

export type TakeDownAssortmentDTO = z.infer<typeof takeDownAssortmentDTOSchema>;
