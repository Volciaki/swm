import { z } from "zod";

const twoFactorAuthenticationResponseDTOSchema = z.object({
    authenticationId: z.string(),
});

export const authenticationTokenResponseDTOSchema = z.object({
    authenticationToken: z.string(),
});

export const loginResponseDTOSchema = z.union([
    twoFactorAuthenticationResponseDTOSchema,
    authenticationTokenResponseDTOSchema,
]);

export type LoginResponseDTO = z.infer<typeof loginResponseDTOSchema>;
