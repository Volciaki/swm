import { z } from "zod";

export const loginDTOSchema = z.object({
	email: z.string(),
	passwordRaw: z.string(),
});

export type LoginDTO = z.infer<typeof loginDTOSchema>;
