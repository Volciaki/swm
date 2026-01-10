import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";
import { GetAssortmentDTO } from "../dto/GetAssortmentDTO";
import { AssortmentHelper } from "../helpers/AssortmentHelper";

export class GetAssortment {
	constructor(private readonly assortmentHelper: AssortmentHelper) {}

	async execute(dto: GetAssortmentDTO) {
		const assortment = await this.assortmentHelper.getByIdStringOrThrow(dto.id);
		return AssortmentMapper.fromAssortmentToAssortmentDTO(assortment);
	}
}
