import type { z } from "zod";
import { userDTOSchema } from "@/server/utils";

// Fields of UserDTO object that are safe to share with clients.
export const publicUserDTO = userDTOSchema.omit({ passwordHash: true });

export type PublicUserDTO = z.infer<typeof publicUserDTO>;
