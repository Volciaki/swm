import type { CreateAssortmentDTO } from "../dto/CreateAssortmentDTO";
import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";
import type { AssortmentHelper } from "../helpers/AssortmentHelper";
import type { AssortmentDefinitionUtilities } from "../services/AssortmentDefinitionUtilities";

export class CreateAssortment {
	constructor(
		private readonly assortmentHelper: AssortmentHelper,
		private readonly assortmentDefinitionUtilities: AssortmentDefinitionUtilities
	) {}

	async execute(dto: CreateAssortmentDTO) {
		const assortment = await this.assortmentHelper.createByDTO(
			dto,
			this.assortmentDefinitionUtilities.definitionGetter
		);
		return AssortmentMapper.fromAssortmentToAssortmentDTO(assortment);
	}
}
