import { z } from "zod";
import { userDTOSchema } from "@/server/utils";

export const createUserDTOSchema = userDTOSchema
	.omit({ id: true, passwordHash: true })
	.extend({ passwordRaw: z.string() });

export type CreateUserDTO = z.infer<typeof createUserDTOSchema>;
