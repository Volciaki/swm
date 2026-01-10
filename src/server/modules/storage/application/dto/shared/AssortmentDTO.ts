// Yes, this file is largely the same as `assortment/application/dto/shared/AssortmentDTO.ts`.
// Technically they should stay decoupled as interfaces of bounded contexts can change.

import { z } from "zod";
import { temperatureRangeDTOSchema, dimensionsDTOSchema } from "@/server/utils";

export const assortmentDTOSchema = z.object({
	id: z.string(),
	cellId: z.string(),
	shelfId: z.string(),
	name: z.string(),
	// qrCode: z.string(),
	// image: z.string(),
	temperatureRange: temperatureRangeDTOSchema,
	weightKg: z.number(),
	size: dimensionsDTOSchema,
	comment: z.string(),
	storedAtTimestamp: z.number(),
	expiresAfterSeconds: z.number(),
	isHazardous: z.boolean(),
});

export type AssortmentDTO = z.infer<typeof assortmentDTOSchema>;
