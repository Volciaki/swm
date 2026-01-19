import { z } from "zod";
import { dimensionsDTOSchema, temperatureRangeDTOSchema } from "@/server/utils";
import { fileReferenceDTOSchema } from "@/server/utils/files/application/dto/shared/FileReferenceDTO";
import { notificationVOSchema } from "../../../domain/vo/NotificationVO";

export const assortmentDTOSchema = z.object({
	id: z.string(),
	cellId: z.string(),
	shelfId: z.string(),
	name: z.string(),
	qrCode: fileReferenceDTOSchema,
	image: fileReferenceDTOSchema.nullable(),
	temperatureRange: temperatureRangeDTOSchema,
	weightKg: z.number(),
	size: dimensionsDTOSchema,
	comment: z.string(),
	storedAtTimestamp: z.number(),
	expiresAfterSeconds: z.number(),
	isHazardous: z.boolean(),
	hasExpired: z.boolean(),
	hasExpiredNotification: notificationVOSchema.nullable(),
	isCloseToExpiration: z.boolean(),
	isCloseToExpirationNotification: notificationVOSchema.nullable(),
});

export type AssortmentDTO = z.infer<typeof assortmentDTOSchema>;
