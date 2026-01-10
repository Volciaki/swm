import { z } from "zod";

export const deleteUserDTOSchema = z.object({
	id: z.string(),
});

export type DeleteUserDTO = z.infer<typeof deleteUserDTOSchema>;
