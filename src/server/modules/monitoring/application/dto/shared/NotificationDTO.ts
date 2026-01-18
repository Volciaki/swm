import { z } from "zod";

export const notificationDTOSchema = z.object({
	id: z.string(),
	type: z.string(),
	issuedDateTimestamp: z.number(),
	title: z.string(),
	message: z.string(),
});

export type NotificationDTO = z.infer<typeof notificationDTOSchema>;
