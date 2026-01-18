import { z } from "zod";
import { assortmentDTOSchema } from "./AssortmentDTO";

export const createAssortmentDTOSchema = assortmentDTOSchema
	.omit({
		id: true,
		storedAtTimestamp: true,
		qrCode: true,
		image: true,
	})
	.extend({
		imageContentBase64: z.string().nullable(),
	});

export type CreateAssortmentDTO = z.infer<typeof createAssortmentDTOSchema>;
