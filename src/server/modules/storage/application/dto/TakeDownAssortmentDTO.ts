import { z } from "zod";

export const takeDownAssortmentDTOSchema = z.object({
    assortmentId: z.string(),
});

export type TakeDownAssortmentDTO = z.infer<typeof takeDownAssortmentDTOSchema>;
