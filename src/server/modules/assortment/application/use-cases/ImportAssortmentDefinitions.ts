import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { Base64UploadFunction, QRCodeGetter } from "../helpers/AssortmentHelper";
import type { ImportAssortmentDefinitionsDTO } from "../dto/ImportAssortmentDefinitionsDTO";
import type { AssortmentDefinitionHelper } from "../helpers/AssortmentDefinitionHelper";
import { AssortmentDefinitionMapper } from "../../infrastructure/mappers/AssortmentDefinitionMapper";

export type ImportAssortmentDefinitionsOptions = {
	getQRCode: QRCodeGetter;
	addAssortmentImageByBase64: Base64UploadFunction;
};

export class ImportAssortmentDefinitions {
	constructor(private readonly assortmentDefinitionHelper: AssortmentDefinitionHelper) {}

	async execute(
		dto: ImportAssortmentDefinitionsDTO,
		options: ImportAssortmentDefinitionsOptions,
		currentUser?: UserDTO
	) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const { addAssortmentImageByBase64, getQRCode } = options;
		const definitions = await Promise.all(
			dto.definitions.map(
				async (dtoObject) =>
					await this.assortmentDefinitionHelper.createByDTO(dtoObject, getQRCode, addAssortmentImageByBase64)
			)
		);
		return definitions.map((definition) => AssortmentDefinitionMapper.fromEntityToDTO(definition));
	}
}
