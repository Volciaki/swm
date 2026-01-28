import { z } from "zod";
import { publicUserDTO } from "./shared/PublicUserDTO";

export const listUsersResponseDTOSchema = z.array(publicUserDTO);

export type ListUsersResponseDTO = z.infer<typeof listUsersResponseDTOSchema>;
