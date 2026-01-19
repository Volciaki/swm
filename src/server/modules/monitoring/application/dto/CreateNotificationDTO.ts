import { z } from "zod";

export const createNotificationDTOSchema = z.object({
	type: z.string(),
	title: z.string(),
	message: z.string(),
});

export type CreateNotificationDTO = z.infer<typeof createNotificationDTOSchema>;
