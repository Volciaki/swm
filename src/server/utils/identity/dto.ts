import { z } from "zod";

export const userDTOSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    passwordHash: z.string(),
    isAdmin: z.boolean(),
    twoFactorAuthenticationEnabled: z.boolean(),
});

export type UserDTO = z.infer<typeof userDTOSchema>;
