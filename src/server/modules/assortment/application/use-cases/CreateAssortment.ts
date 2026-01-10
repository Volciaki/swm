import { UnauthorizedError } from "@/server/utils/unauthorized/error";
import { UserDTO } from "@/server/utils";
import { CreateAssortmentDTO } from "../dto/shared/CreateAssortmentDTO";
import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";
import { AssortmentHelper } from "../helpers/AssortmentHelper";

export class CreateAssortment {
	constructor(private readonly assortmentHelper: AssortmentHelper) {}

	async execute(dto: CreateAssortmentDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const assortment = await this.assortmentHelper.createByDTO(dto);
		return AssortmentMapper.fromAssortmentToAssortmentDTO(assortment);
	}
}
