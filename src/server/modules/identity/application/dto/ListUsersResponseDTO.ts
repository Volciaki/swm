import { z } from "zod";
import { userDTOSchema } from "./shared/UserDTO";

export const listUsersResponseDTOSchema = z.array(userDTOSchema.omit({
	twoFactorAuthenticationEnabled: true,
	passwordHash: true,
}));

export type ListUsersResponseDTO = z.infer<typeof listUsersResponseDTOSchema>;
