import { z } from "zod";

export const createUserDTOSchema = z.object({
    name: z.string(),
    email: z.string(),
    passwordRaw: z.string(),
    isAdmin: z.boolean(),
    twoFactorAuthenticationEnabled: z.boolean(),
});

export type CreateUserDTO = z.infer<typeof createUserDTOSchema>;
