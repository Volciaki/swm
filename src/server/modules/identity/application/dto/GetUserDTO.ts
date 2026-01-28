import { z } from "zod";

export const getUserDTOSchema = z.object({
	id: z.string(),
});

export type GetUserDTO = z.infer<typeof getUserDTOSchema>;
