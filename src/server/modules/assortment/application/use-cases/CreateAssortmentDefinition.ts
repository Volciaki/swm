import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { Base64UploadFunction, QRCodeGetter } from "../helpers/AssortmentHelper";
import type { CreateAssortmentDefinitionDTO } from "../dto/shared/CreateAssortmentDefinitionDTO";
import type { AssortmentDefinitionHelper } from "../helpers/AssortmentDefinitionHelper";
import { AssortmentDefinitionMapper } from "../../infrastructure/mappers/AssortmentDefinitionMapper";

export type CreateAssortmentDefinitionOptions = {
	getQRCode: QRCodeGetter;
	addAssortmentImageByBase64: Base64UploadFunction;
	skipAuthentication?: boolean;
};

export class CreateAssortmentDefinition {
	constructor(private readonly assortmentDefinitionHelper: AssortmentDefinitionHelper) {}

	async execute(
		dto: CreateAssortmentDefinitionDTO,
		optionsUnsafe: CreateAssortmentDefinitionOptions,
		currentUser?: UserDTO
	) {
		const options: CreateAssortmentDefinitionOptions = {
			skipAuthentication: false,
			...optionsUnsafe,
		};

		if (!currentUser?.isAdmin && !options.skipAuthentication) throw new UnauthorizedError();

		const { getQRCode, addAssortmentImageByBase64 } = options;
		const assortmentDefinition = await this.assortmentDefinitionHelper.createByDTO(
			dto,
			getQRCode,
			addAssortmentImageByBase64
		);
		return AssortmentDefinitionMapper.fromEntityToDTO(assortmentDefinition);
	}
}
