import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";
import type { GetAssortmentDTO } from "../dto/GetAssortmentDTO";
import type { AssortmentHelper } from "../helpers/AssortmentHelper";
import type { AssortmentFileHelper } from "../services/AssortmentFileHelper";

export class GetAssortment {
	constructor(
		private readonly assortmentHelper: AssortmentHelper,
		private readonly assortmentFileHelper: AssortmentFileHelper
	) {}

	async execute(dto: GetAssortmentDTO) {
		const assortment = await this.assortmentHelper.getByIdStringOrThrow(dto.id, this.assortmentFileHelper.fileGetter);
		return AssortmentMapper.fromAssortmentToAssortmentDTO(assortment);
	}
}
