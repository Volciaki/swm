import { z } from "zod";

export const twoFactorAuthenticationDTOSchema = z.object({
    authenticationId: z.string(),
    value: z.string(),
});

export type TwoFactorAuthenticationDTO = z.infer<typeof twoFactorAuthenticationDTOSchema>;
