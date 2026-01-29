import { z } from "zod";

export const getUserByIdDTOSchema = z.object({
	id: z.string(),
});

export type GetUserByIdDTO = z.infer<typeof getUserByIdDTOSchema>;
