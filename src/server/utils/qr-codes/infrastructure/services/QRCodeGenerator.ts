import { readFile } from "fs/promises";
import { QRCode } from "../../domain/entities/QRCode";
import { GenerateQRCodeOptions, QRCodeGenerator } from "../../domain/services/QRCodeGenerator";
import qrcode from "qrcode";
import sharp from "sharp";
import path from "path";

// Around 25-30% of the QR code can be damaged if using high correction level.
// (This includes the white background margin around our logo asset).
const LOGO_SIZE_RATIO = 0.273;

const getOffsetBySize = (totalSize: number, size: number): number => {
	return Math.floor((totalSize - size) / 2);
};

export class DefaultQRCodeGenerator implements QRCodeGenerator {
	async generate(code: QRCode, optionsUnsafe?: GenerateQRCodeOptions) {
		const options: GenerateQRCodeOptions = {
			addLogo: true,
			...optionsUnsafe,
		};

		let buffer;
		buffer = await qrcode.toBuffer(JSON.stringify(code.data), {
			type: "png",
			margin: 2,
			errorCorrectionLevel: "high",
			width: code.size.value,
		});

		if (options.addLogo) {
			const backgroundSize = Math.floor(LOGO_SIZE_RATIO * code.size.value);
			const logoSize = Math.floor(backgroundSize - 0.03 * code.size.value);
	
			const background = await sharp(
				{
					create: {
						width: backgroundSize,
						height: backgroundSize,
						channels: 4,
						background: { r: 255, g: 255, b: 255, alpha: 1 },
					},
				})
				.png()
				.toBuffer()

			const logoPath = path.join(process.cwd(), "src/server/assets/qr-logo.png");
			const logoBuffer = await readFile(logoPath);
			const logoEditedBuffer = await sharp(logoBuffer)
				.resize(logoSize, logoSize, { fit: "contain", kernel: sharp.kernel.nearest })
				.png()
				.toBuffer()
			
			const backgroundOffset = getOffsetBySize(code.size.value, backgroundSize);
			const logoOffset = getOffsetBySize(code.size.value, logoSize);
			buffer = await sharp(buffer)
				.composite([
					{
						input: background,
						left: backgroundOffset,
						top: backgroundOffset,
					},
					{
						input: logoEditedBuffer,
						left: logoOffset,
						top: logoOffset,
					},
				])
				.png()
				.toBuffer();
		}

		return buffer;
	}
}
