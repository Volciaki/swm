import { z } from "zod";

const twoFactorAuthenticationResponseDTOSchema = z.object({
	authenticationId: z.string(),
});

export const authenticationTokenResponseDTOSchema = z.object({
	authenticationToken: z.string(),
});

export type AuthenticationTokenResponseDTO = z.infer<typeof authenticationTokenResponseDTOSchema>;

export const loginResponseDTOSchema = z.union([
	twoFactorAuthenticationResponseDTOSchema,
	authenticationTokenResponseDTOSchema,
]);

export type LoginResponseDTO = z.infer<typeof loginResponseDTOSchema>;
