import { z } from "zod";

export const qrCodeDTOSchema = z.object({
	data: z.string(),
	size: z.number(),
});

export type QRCodeDTO = z.infer<typeof qrCodeDTOSchema>;
