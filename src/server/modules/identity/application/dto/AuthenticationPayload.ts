import { z } from "zod";

export const authenticationPayloadDTOSchema = z.object({
    userId: z.string(),
});

export type AuthenticationPayloadDTO = z.infer<typeof authenticationPayloadDTOSchema>;
