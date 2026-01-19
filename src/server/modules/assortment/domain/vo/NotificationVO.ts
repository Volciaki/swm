import { z } from "zod";

export const notificationVOSchema = z.object({
	id: z.string(),
});

export type NotificationVO = z.infer<typeof notificationVOSchema>;
