import { z } from "zod";
import { notificationVOSchema } from "../../domain/vo/NotificationVO";

export const setAssortmentExpiredNotificationDTOSchema = z.object({
	id: z.string(),
	notification: notificationVOSchema.nullable(),
});

export type SetAssortmentExpiredNotificationDTO = z.infer<typeof setAssortmentExpiredNotificationDTOSchema>;
