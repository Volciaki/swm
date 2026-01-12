import { readFile } from "fs/promises";
import { QRCode } from "../../domain/entities/QRCode";
import { GenerateQRCodeOptions, QRCodeGenerator } from "../../domain/services/QRCodeGenerator";
import qrcode from "qrcode";
import sharp from "sharp";
import path from "path";
import { logger } from "@/server/logger";

// Around 20% of the QR code can be damaged if using high correction level.
const LOGO_SIZE_RATIO = 0.2;

// const getOffsetBySize = (totalSize: number, size: number)

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
			const logoSize = LOGO_SIZE_RATIO * code.size.value;

			const backgroundSize = logoSize + 0.02 * code.size.value;
			const background = await sharp(
				{
					create: {
						// TODO: add some margin here?
						width: backgroundSize,
						height: backgroundSize,
						channels: 4,
						background: { r: 255, g: 255, b: 255, alpha: 1 },
					},
				})
				.png()
				.toBuffer()

			const logoPath = path.join(process.cwd(), "src/server/assets/qr-logo.png");
			logger.error(process.cwd());
			const logoBuffer = await readFile(logoPath);
			const logoEditedBuffer = await sharp(logoBuffer)
				.resize(logoSize, logoSize, { fit: "contain", kernel: sharp.kernel.nearest })
				.png()
				.toBuffer()
			
			const backgroundOffset = Math.floor((code.size.value - backgroundSize) / 2);
			const logoOffset = Math.floor((code.size.value - logoSize) / 2);
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
