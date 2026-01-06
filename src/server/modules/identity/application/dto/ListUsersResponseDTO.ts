import { z } from "zod";
import { userDTOSchema } from "@/server/utils";

export const listUsersResponseDTOSchema = z.array(userDTOSchema.omit({
    twoFactorAuthenticationEnabled: true,
    passwordHash: true,
}));

export type ListUsersResponseDTO = z.infer<typeof listUsersResponseDTOSchema>;
