import { z } from "zod";
import { qrCodeDTOSchema } from "./shared/QRCodeDTO";

export const generateQRCodeDTOSchema = z.object({
	qrCode: qrCodeDTOSchema,
});

export type GenerateQRCodeDTO = z.infer<typeof generateQRCodeDTOSchema>;
