import { z } from "zod";

export const getUserByEmailDTOSchema = z.object({
	email: z.string(),
});

export type GetUserByEmailDTO = z.infer<typeof getUserByEmailDTOSchema>;
