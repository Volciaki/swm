import { Base64Mapper } from "@/server/utils/base64";
import { GenerateQRCodeOptions, QRCodeGenerator } from "../../domain/services/QRCodeGenerator";
import { QRCodeMapper } from "../../infrastructure/mappers/QRCodeMapper";
import { GenerateQRCodeDTO } from "../dto/GenerateQRCodeDTO";
import { GenerateQRCodeResponseDTO } from "../dto/GenerateQRCodeResponseDTO";

export class GenerateQRCode {
	constructor(private readonly qrCodeGenerator: QRCodeGenerator) {}

	async execute(dto: GenerateQRCodeDTO, options?: GenerateQRCodeOptions): Promise<GenerateQRCodeResponseDTO> {
		const qrCode = QRCodeMapper.fromDTOToEntity(dto.qrCode);
		const buffer = await this.qrCodeGenerator.generate(qrCode, options);
		return {
			base64: Base64Mapper.fromBuffer(buffer).value,
		};
	}
}
