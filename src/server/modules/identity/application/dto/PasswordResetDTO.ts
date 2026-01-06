import { z } from "zod";

export const passwordResetDTOSchema = z.object({
    authenticationId: z.string(),
    authenticationValue: z.string(),
    newPasswordRaw: z.string(),
});

export type PasswordResetDTO = z.infer<typeof passwordResetDTOSchema>;
