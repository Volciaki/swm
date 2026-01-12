import { QRCode } from "../../domain/entities/QRCode";
import { GenerateQRCodeOptions, QRCodeGenerator } from "../../domain/services/QRCodeGenerator";
import qrcode from "qrcode";

export class DefaultQRCodeGenerator implements QRCodeGenerator {
	async generate(code: QRCode, optionsUnsafe?: GenerateQRCodeOptions) {
		const options: GenerateQRCodeOptions = {
			addLogo: true,
			...optionsUnsafe,
		};

		const buffer = await qrcode.toBuffer(JSON.stringify(code.data), {
			type: "png",
			margin: 4,
			scale: 4,
			errorCorrectionLevel: "high",
		});
		return buffer;
	}
}
