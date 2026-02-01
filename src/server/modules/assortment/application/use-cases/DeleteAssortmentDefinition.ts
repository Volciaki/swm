import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { DeleteProductImageByPathFunction, DeleteQRCodeByPath } from "../helpers/AssortmentHelper";
import type { AssortmentFileHelper } from "../services/AssortmentFileHelper";
import type { DeleteAssortmentDefinitionDTO } from "../dto/DeleteAssortmentDefinitionDTO";
import type { AssortmentDefinitionHelper } from "../helpers/AssortmentDefinitionHelper";

export type DeleteAssortmentDefinitionOptions = {
	deleteQRCodeByPath: DeleteQRCodeByPath;
	deleteProductImageByPath: DeleteProductImageByPathFunction;
};

export class DeleteAssortmentDefinition {
	constructor(
		private readonly assortmentDefinitionHelper: AssortmentDefinitionHelper,
		private readonly assortmentFileHelper: AssortmentFileHelper
	) {}

	async execute(dto: DeleteAssortmentDefinitionDTO, options: DeleteAssortmentDefinitionOptions, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const { deleteQRCodeByPath, deleteProductImageByPath } = options;
		const assortment = await this.assortmentDefinitionHelper.getByIdStringOrThrow(
			dto.id,
			this.assortmentFileHelper.fileGetter
		);

		await this.assortmentDefinitionHelper.delete(assortment, deleteQRCodeByPath, deleteProductImageByPath);
	}
}
