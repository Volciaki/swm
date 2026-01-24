import { z } from "zod";

export const generateQRCodeResponseDTOSchema = z.object({
	base64: z.string(),
});

export type GenerateQRCodeResponseDTO = z.infer<typeof generateQRCodeResponseDTOSchema>;
