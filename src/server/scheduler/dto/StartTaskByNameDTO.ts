import { z } from "zod";

export const startTaskByNameDTOSchema = z.object({
	name: z.string(),
	authenticationPassphrase: z.string(),
});

export type StartTaskByNameDTO = z.infer<typeof startTaskByNameDTOSchema>;
