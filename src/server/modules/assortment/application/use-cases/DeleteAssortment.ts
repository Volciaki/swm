import { UnauthorizedError, UserDTO } from "@/server/utils";
import { DeleteAssortmentDTO } from "../dto/DeleteAssortmentDTO";
import { AssortmentHelper, DeleteProductImageByPathFunction, DeleteQRCodeByPath } from "../helpers/AssortmentHelper";
import { AssortmentFileHelper } from "../services/AssortmentFileHelper";

export type DeleteAssortmentOptions = {
	deleteQRCodeByPath: DeleteQRCodeByPath,
	deleteProductImageByPath: DeleteProductImageByPathFunction,
};

export class DeleteAssortment {
	constructor(
		private readonly assortmentHelper: AssortmentHelper,
		private readonly assortmentFileHelper: AssortmentFileHelper,
	) { }

	async execute(
		dto: DeleteAssortmentDTO,
		options: DeleteAssortmentOptions,
		currentUser?: UserDTO,
	) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const { deleteQRCodeByPath, deleteProductImageByPath } = options;
		const assortment = await this.assortmentHelper.getByIdStringOrThrow(dto.id, this.assortmentFileHelper.fileGetter);
	
		await this.assortmentHelper.delete(assortment, deleteQRCodeByPath, deleteProductImageByPath);
	}
}
