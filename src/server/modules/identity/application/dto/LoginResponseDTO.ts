import { z } from "zod";

export const twoFactorAuthenticationResponseDTOSchema = z.object({
	authenticationId: z.string(),
});

export type TwoFactorAuthenticationResponseDTO = z.infer<typeof twoFactorAuthenticationResponseDTOSchema>;

export const authenticationTokenResponseDTOSchema = z.object({
	authenticationToken: z.string(),
});

export type AuthenticationTokenResponseDTO = z.infer<typeof authenticationTokenResponseDTOSchema>;

export const loginResponseDTOSchema = z.union([
	twoFactorAuthenticationResponseDTOSchema,
	authenticationTokenResponseDTOSchema,
]);

export type LoginResponseDTO = z.infer<typeof loginResponseDTOSchema>;
