import { z } from "zod";
import { notificationVOSchema } from "../../domain/vo/NotificationVO";

export const setAssortmentCloseToExpirationNotificationDTOSchema = z.object({
	id: z.string(),
	notification: notificationVOSchema.nullable(),
});

export type SetAssortmentCloseToExpirationNotificationDTO = z.infer<
	typeof setAssortmentCloseToExpirationNotificationDTOSchema
>;
