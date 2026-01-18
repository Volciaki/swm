import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";
import { GetAssortmentDTO } from "../dto/GetAssortmentDTO";
import { AssortmentHelper } from "../helpers/AssortmentHelper";
import { AssortmentFileHelper } from "../services/AssortmentFileHelper";

export class GetAssortment {
	constructor(
		private readonly assortmentHelper: AssortmentHelper,
		private readonly assortmentFileHelper: AssortmentFileHelper,
	) {}

	async execute(dto: GetAssortmentDTO) {
		const assortment = await this.assortmentHelper.getByIdStringOrThrow(dto.id, this.assortmentFileHelper.fileGetter);
		return AssortmentMapper.fromAssortmentToAssortmentDTO(assortment);
	}
}
