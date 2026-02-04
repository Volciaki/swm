import { UnauthorizedError, type UserDTO } from "@/server/utils";
import type { AssortmentDefinitionRepository } from "../../domain/repositories/AssortmentDefinitionRepository";
import { AssortmentDefinitionMapper } from "../../infrastructure/mappers/AssortmentDefinitionMapper";
import type { AssortmentFileHelper } from "../services/AssortmentFileHelper";

export type GetAllAssortmentDefinitionsOptions = {
	skipAuthentication?: boolean;
};

export class GetAllAssortmentDefinitions {
	constructor(
		private readonly assortmentDefinitionRepository: AssortmentDefinitionRepository,
		private readonly assortmentFileHelper: AssortmentFileHelper
	) {}

	async execute(currentUser?: UserDTO, optionsUnsafe?: GetAllAssortmentDefinitionsOptions) {
		const options: GetAllAssortmentDefinitionsOptions = {
			skipAuthentication: false,
			...optionsUnsafe,
		};

		if (!currentUser && !options.skipAuthentication) throw new UnauthorizedError();

		const definitions = await this.assortmentDefinitionRepository.getAll(this.assortmentFileHelper.fileGetter);
		return definitions.map((definition) => AssortmentDefinitionMapper.fromEntityToDTO(definition));
	}
}
