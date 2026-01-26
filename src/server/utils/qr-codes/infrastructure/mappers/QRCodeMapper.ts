import { PositiveNumber } from "@/server/utils/numbers/positive";
import type { QRCodeDTO } from "../../application/dto/shared/QRCodeDTO";
import { QRCode } from "../../domain/entities/QRCode";

export class QRCodeMapper {
	static fromDTOToEntity(dto: QRCodeDTO): QRCode {
		return QRCode.create(dto.data, PositiveNumber.create(dto.size));
	}
}
