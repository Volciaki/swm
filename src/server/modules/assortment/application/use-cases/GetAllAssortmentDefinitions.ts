import type { AssortmentDefinitionRepository } from "../../domain/repositories/AssortmentDefinitionRepository";
import { AssortmentDefinitionMapper } from "../../infrastructure/mappers/AssortmentDefinitionMapper";
import type { AssortmentFileHelper } from "../services/AssortmentFileHelper";

export class GetAllAssortmentDefinitions {
	constructor(
		private readonly assortmentDefinitionRepository: AssortmentDefinitionRepository,
		private readonly assortmentFileHelper: AssortmentFileHelper
	) {}

	async execute() {
		const definitions = await this.assortmentDefinitionRepository.getAll(this.assortmentFileHelper.fileGetter);
		return definitions.map((definition) => AssortmentDefinitionMapper.fromEntityToDTO(definition));
	}
}
