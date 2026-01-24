import { z } from "zod";

export const takeDownAssortmentCopyDTOSchema = z.object({
	id: z.string(),
});

export type TakeDownAssortmentCopyDTO = z.infer<typeof takeDownAssortmentCopyDTOSchema>;
