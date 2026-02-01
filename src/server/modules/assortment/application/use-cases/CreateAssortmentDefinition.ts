import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { Base64UploadFunction, QRCodeGetter } from "../helpers/AssortmentHelper";
import type { CreateAssortmentDefinitionDTO } from "../dto/shared/CreateAssortmentDefinitionDTO";
import type { AssortmentDefinitionHelper } from "../helpers/AssortmentDefinitionHelper";
import { AssortmentDefinitionMapper } from "../../infrastructure/mappers/AssortmentDefinitionMapper";

export type CreateAssortmentDefinitionOptions = {
	getQRCode: QRCodeGetter;
	addAssortmentImageByBase64: Base64UploadFunction;
};

export class CreateAssortmentDefinition {
	constructor(private readonly assortmentDefinitionHelper: AssortmentDefinitionHelper) {}

	async execute(dto: CreateAssortmentDefinitionDTO, options: CreateAssortmentDefinitionOptions, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const { getQRCode, addAssortmentImageByBase64 } = options;
		const assortmentDefinition = await this.assortmentDefinitionHelper.createByDTO(
			dto,
			getQRCode,
			addAssortmentImageByBase64
		);
		return AssortmentDefinitionMapper.fromEntityToDTO(assortmentDefinition);
	}
}
