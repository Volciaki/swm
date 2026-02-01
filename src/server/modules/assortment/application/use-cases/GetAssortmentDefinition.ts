import { UnauthorizedError, type UserDTO } from "@/server/utils";
import { AssortmentDefinitionMapper } from "../../infrastructure/mappers/AssortmentDefinitionMapper";
import type { GetAssortmentDefinitionDTO } from "../dto/GetAssortmentDefinitionDTO";
import type { AssortmentDefinitionHelper } from "../helpers/AssortmentDefinitionHelper";
import type { AssortmentFileHelper } from "../services/AssortmentFileHelper";

export type GetAssortmentDefinitionOptions = {
	skipAuthentication?: boolean;
};

export class GetAssortmentDefinition {
	constructor(
		private readonly assortmentDefinitionHelper: AssortmentDefinitionHelper,
		private readonly assortmentFileHelper: AssortmentFileHelper
	) {}

	async execute(
		dto: GetAssortmentDefinitionDTO,
		optionsUnsafe?: GetAssortmentDefinitionOptions,
		currentUser?: UserDTO
	) {
		const options: GetAssortmentDefinitionOptions = {
			skipAuthentication: false,
			...optionsUnsafe,
		};

		if (!currentUser && !options.skipAuthentication) throw new UnauthorizedError();

		const definition = await this.assortmentDefinitionHelper.getByIdStringOrThrow(
			dto.id,
			this.assortmentFileHelper.fileGetter
		);
		return AssortmentDefinitionMapper.fromEntityToDTO(definition);
	}
}
