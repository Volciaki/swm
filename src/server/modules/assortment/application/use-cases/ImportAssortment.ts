import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";
import type { ImportAssortmentDTO } from "../dto/ImportAssortmentDTO";
import type { AssortmentHelper, Base64UploadFunction, QRCodeGetter } from "../helpers/AssortmentHelper";

export type ImportAssortmentOptions = {
	getQRCode: QRCodeGetter;
	addAssortmentImageByBase64: Base64UploadFunction;
};

export class ImportAssortment {
	constructor(private readonly assortmentHelper: AssortmentHelper) {}

	async execute(dto: ImportAssortmentDTO, options: ImportAssortmentOptions, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const { addAssortmentImageByBase64, getQRCode } = options;
		const assortment = await Promise.all(
			dto.assortment.map(
				async (dtoObject) => await this.assortmentHelper.createByDTO(dtoObject, getQRCode, addAssortmentImageByBase64)
			)
		);
		return assortment.map((assortment) => AssortmentMapper.fromAssortmentToAssortmentDTO(assortment));
	}
}
