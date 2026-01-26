import { z } from "zod";
import { dimensionsDTOSchema, temperatureRangeDTOSchema } from "@/server/utils";
import { fileReferenceDTOSchema } from "@/server/utils/files/application/dto/shared/FileReferenceDTO";

export const assortmentVOSchema = z.object({
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
	isCloseToExpiration: z.boolean(),
});

export type AssortmentVO = z.infer<typeof assortmentVOSchema>;
