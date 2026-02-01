import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";
import type { GetAssortmentDTO } from "../dto/GetAssortmentDTO";
import type { AssortmentHelper } from "../helpers/AssortmentHelper";
import type { AssortmentDefinitionUtilities } from "../services/AssortmentDefinitionUtilities";

export class GetAssortment {
	constructor(
		private readonly assortmentHelper: AssortmentHelper,
		private readonly assortmentDefinitionUtilities: AssortmentDefinitionUtilities
	) {}

	async execute(dto: GetAssortmentDTO) {
		const assortment = await this.assortmentHelper.getByIdStringOrThrow(
			dto.id,
			this.assortmentDefinitionUtilities.definitionGetter
		);
		return AssortmentMapper.fromAssortmentToAssortmentDTO(assortment);
	}
}
