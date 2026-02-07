import { z } from "zod";
import { notificationVOSchema } from "../../../domain/vo/NotificationVO";
import { assortmentDefinitionDTOSchema } from "./AssortmentDefinitionDTO";

export const assortmentDTOSchema = z.object({
	id: z.string(),
	cellId: z.string(),
	shelfId: z.string(),
	definition: assortmentDefinitionDTOSchema,
	storedAtTimestamp: z.number(),
	hasExpired: z.boolean(),
	hasExpiredNotification: notificationVOSchema.nullable(),
	isCloseToExpiration: z.boolean(),
	isCloseToExpirationNotification: notificationVOSchema.nullable(),
	putUpByUserId: z.string(),
});

export type AssortmentDTO = z.infer<typeof assortmentDTOSchema>;
