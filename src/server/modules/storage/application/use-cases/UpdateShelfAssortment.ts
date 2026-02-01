// TODO: add `UpdateShelfAssortmentDefinition`

// import type { UserDTO } from "@/server/utils";
// import { UnauthorizedError, UUID } from "@/server/utils";
// import type { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
// import type { ValidateShelf } from "@/server/modules/warehouse/application/use-cases/ValidateShelf";
// import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
// import type { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
// import type { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
// import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
// import type { DeleteFileByPath } from "@/server/utils/files/application/use-cases/DeleteFileByPath";
// import {
// 	isFileEncryptedByBucket,
// 	S3FileStorageBucket,
// } from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
// import type { RefreshShelfLegalWeight } from "@/server/modules/warehouse/application/use-cases/RefreshShelfLegalWeight";
// import type { UpdateShelfAssortmentDTO } from "../dto/UpdateShelfAssortmentDTO";
// import type {
// 	UpdateAssortment,
// 	UpdateAssortmentOptions,
// } from "@/server/modules/assortment/application/use-cases/UpdateAssortment";
//
// export class UpdateShelfAssortment {
// 	constructor(
// 		private readonly getAssortmentAction: GetAssortment,
// 		private readonly updateAssortmentAction: UpdateAssortment,
// 		private readonly getAllAssortmentAction: GetAllAssortment,
// 		private readonly validateShelfAction: ValidateShelf,
// 		private readonly refreshShelfLegalWeight: RefreshShelfLegalWeight,
// 		private readonly fetchFileAction: FetchFile,
// 		private readonly deleteFileByPathAction: DeleteFileByPath,
// 		private readonly uploadFileAction: UploadFile
// 	) {}
//
// 	private getUpdateOptions(currentUser?: UserDTO): UpdateAssortmentOptions {
// 		return {
// 			fetchAssortmentImage: async (id) =>
// 				await this.fetchFileAction.execute(
// 					{ id: id.value, metadata: { bucket: S3FileStorageBucket.ASSORTMENT_IMAGES } },
// 					{ skipAuthentication: true }
// 				),
// 			deleteProductImageByPath: async (path) =>
// 				await this.deleteFileByPathAction.execute(
// 					{
// 						path,
// 						metadata: { bucket: S3FileStorageBucket.ASSORTMENT_IMAGES },
// 					},
// 					currentUser
// 				),
// 			addAssortmentImageByBase64: async (path, contentBase64) => {
// 				const file = await this.uploadFileAction.execute(
// 					{
// 						path,
// 						contentBase64,
// 						mimeType: "image/png",
// 						metadata: { bucket: S3FileStorageBucket.ASSORTMENT_IMAGES },
// 						isEncrypted: isFileEncryptedByBucket(S3FileStorageBucket.ASSORTMENT_IMAGES),
// 					},
// 					undefined,
// 					currentUser
// 				);
// 				return FileReferenceMapper.fromDTOToEntity(file);
// 			},
// 		};
// 	}
//
// 	async execute(dto: UpdateShelfAssortmentDTO, currentUser?: UserDTO) {
// 		if (!currentUser?.isAdmin) throw new UnauthorizedError();
//
// 		const updateOptions = this.getUpdateOptions(currentUser);
//
// 		const assortment = await this.getAssortmentAction.execute({ id: dto.id });
//
// 		const fullAssortment = {
// 			...assortment,
// 			imageContentBase64:
// 				assortment.image === null
// 					? null
// 					: (await updateOptions.fetchAssortmentImage(UUID.fromString(assortment.image.id))).base64,
// 		};
// 		const newAssortment = await this.updateAssortmentAction.execute(
// 			{ id: dto.id, newData: dto.newData },
// 			updateOptions,
// 			currentUser
// 		);
// 		try {
// 			const allAssortment = await this.getAllAssortmentAction.execute();
// 			const shelfIdentification = { id: assortment.shelfId, assortmentContext: allAssortment };
//
// 			await this.validateShelfAction.execute(shelfIdentification, currentUser);
// 			await this.refreshShelfLegalWeight.execute(shelfIdentification);
//
// 			return newAssortment;
// 		} catch (error) {
// 			await this.updateAssortmentAction.execute(
// 				{ id: newAssortment.id, newData: fullAssortment },
// 				updateOptions,
// 				currentUser
// 			);
//
// 			throw error;
// 		}
// 	}
// }
