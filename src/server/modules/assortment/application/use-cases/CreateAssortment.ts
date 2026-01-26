import { UnauthorizedError, UserDTO } from "@/server/utils";
import { CreateAssortmentDTO } from "../dto/shared/CreateAssortmentDTO";
import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";
import { AssortmentHelper, Base64UploadFunction, QRCodeGetter } from "../helpers/AssortmentHelper";

export type CreateAssortmentOptions = {
	getQRCode: QRCodeGetter,
	addAssortmentImageByBase64: Base64UploadFunction
};

export class CreateAssortment {
	constructor(private readonly assortmentHelper: AssortmentHelper) {}

	async execute(
		dto: CreateAssortmentDTO,
		options: CreateAssortmentOptions,
		currentUser?: UserDTO,
	) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const { getQRCode, addAssortmentImageByBase64 } = options;
		const assortment = await this.assortmentHelper.createByDTO(dto, getQRCode, addAssortmentImageByBase64);
		return AssortmentMapper.fromAssortmentToAssortmentDTO(assortment);
	}
}
