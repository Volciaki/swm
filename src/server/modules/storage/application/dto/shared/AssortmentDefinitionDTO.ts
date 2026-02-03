import { z } from "zod";
import { dimensionsDTOSchema, temperatureRangeDTOSchema } from "@/server/utils";
import { fileReferenceDTOSchema } from "@/server/utils/files/application/dto/shared/FileReferenceDTO";

export const assortmentDefinitionDTOSchema = z.object({
	id: z.string(),
	name: z.string(),
	qrCode: fileReferenceDTOSchema,
	image: fileReferenceDTOSchema.nullable(),
	temperatureRange: temperatureRangeDTOSchema,
	weightKg: z.number(),
	size: dimensionsDTOSchema,
	comment: z.string(),
	expiresAfterSeconds: z.number(),
	isHazardous: z.boolean(),
});

export type AssortmentDefinitionDTO = z.infer<typeof assortmentDefinitionDTOSchema>;
