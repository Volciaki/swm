import { z } from "zod";

export const updateUserDTOSchema = z.object({
	id: z.string(),
	newData: z.object({
		name: z.string(),
		email: z.string(),
		passwordRaw: z.string(),
		isAdmin: z.boolean(),
		twoFactorAuthenticationEnabled: z.boolean(),
	}),
});

export type UpdateUserDTO = z.infer<typeof updateUserDTOSchema>;
