import { UnauthorizedError } from "@/server/utils";
import { UserDTO } from "@/server/utils";
import { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import { DeleteAssortmentDTO } from "../dto/DeleteAssortmentDTO";
import { AssortmentHelper } from "../helpers/AssortmentHelper";
import { AssortmentFileHelper } from "../services/AssortmentFileHelper";

export class DeleteAssortment {
	constructor(
		private readonly assortmentRepository: AssortmentRepository,
		private readonly assortmentHelper: AssortmentHelper,
		private readonly assortmentFileHelper: AssortmentFileHelper,
	) { }

	async execute(dto: DeleteAssortmentDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const assortment = await this.assortmentHelper.getByIdStringOrThrow(dto.id, this.assortmentFileHelper.fileGetter);
		await this.assortmentRepository.delete(assortment);
	}
}
