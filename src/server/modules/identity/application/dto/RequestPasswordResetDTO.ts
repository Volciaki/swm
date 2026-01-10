import { z } from "zod";

export const requestPasswordResetDTOSchema = z.object({
	userId: z.string(),
});

export type RequestPasswordResetDTO = z.infer<typeof requestPasswordResetDTOSchema>;
