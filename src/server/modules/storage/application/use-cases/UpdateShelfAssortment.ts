import { UnauthorizedError, UserDTO } from "@/server/utils";
import { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { UpdateAssortment, UpdateAssortmentOptions } from "@/server/modules/assortment/application/use-cases/UpdateAssortment";
import { ValidateShelf } from "@/server/modules/warehouse/application/use-cases/ValidateShelf";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import { DeleteFileByPath } from "@/server/utils/files/application/use-cases/DeleteFileByPath";
import { UpdateShelfAssortmentDTO } from "../dto/UpdateShelfAssortmentDTO";

export class UpdateShelfAssortment {
	constructor(
		private readonly getAssortmentAction: GetAssortment,
		private readonly updateAssortmentAction: UpdateAssortment,
		private readonly getAllAssortmentAction: GetAllAssortment,
		private readonly validateShelfAction: ValidateShelf,
		private readonly fetchFileAction: FetchFile,
		private readonly deleteFileByPathAction: DeleteFileByPath,
		private readonly uploadFileAction: UploadFile,
	) { }

	private getUpdateOptions(currentUser?: UserDTO): UpdateAssortmentOptions {
		return {
			fetchAssortmentImage: async (id) => this.fetchFileAction.execute({ id: id.value }, currentUser),
			deleteProductImageByPath: async (path) => this.deleteFileByPathAction.execute({ path }, currentUser),
			addAssortmentImageByBase64: async (path, contentBase64) => {
				const file = await this.uploadFileAction.execute(
					{
						path,
						contentBase64,
						mimeType: "image/png",
					},
					currentUser,
				);
				return FileReferenceMapper.fromDTOToEntity(file);
			},
		};
	}

	async execute(dto: UpdateShelfAssortmentDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const assortment = await this.getAssortmentAction.execute({ id: dto.id });
		const fullAssortment = {
			...assortment,
			imageContentBase64: assortment.image === null
				? null
				: (await this.fetchFileAction.execute({ id: assortment.image.id }, currentUser)).base64
		};
		const newAssortment = await this.updateAssortmentAction.execute(
			{ id: dto.id, newData: dto.newData },
			this.getUpdateOptions(currentUser),
			currentUser
		);
		try {
			const allAssortment = await this.getAllAssortmentAction.execute();
			await this.validateShelfAction.execute({ id: assortment.shelfId, assortmentContext: allAssortment }, currentUser);
			return newAssortment;
		} catch (error) {
			await this.updateAssortmentAction.execute(
				{ id: newAssortment.id, newData: fullAssortment },
				this.getUpdateOptions(currentUser),
				currentUser,
			);

			throw error;
		}
	}
}
