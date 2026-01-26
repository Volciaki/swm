import type { QRCode } from "../entities/QRCode";

export type GenerateQRCodeOptions = { addLogo: boolean };

export interface QRCodeGenerator {
	generate(code: QRCode, options?: GenerateQRCodeOptions): Promise<Buffer>;
}
