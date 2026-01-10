import { UnauthorizedError } from "@/server/utils/unauthorized/error";
import { UserDTO } from "@/server/utils";
import { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import { DeleteAssortmentDTO } from "../dto/DeleteAssortmentDTO";
import { AssortmentHelper } from "../helpers/AssortmentHelper";

export class DeleteAssortment {
	constructor(
        private readonly assortmentRepository: AssortmentRepository,
        private readonly assortmentHelper: AssortmentHelper,
	) {}

	async execute(dto: DeleteAssortmentDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const assortment = await this.assortmentHelper.getByIdStringOrThrow(dto.id);
		await this.assortmentRepository.delete(assortment);
	}
}
