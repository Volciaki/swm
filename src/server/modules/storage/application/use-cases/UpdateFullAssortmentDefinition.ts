import type { UserDTO } from "@/server/utils";
import { assortmentDTOsToAssortmentVOs, UnauthorizedError } from "@/server/utils";
import type { ValidateShelf } from "@/server/modules/warehouse/application/use-cases/ValidateShelf";
import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import type { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import type { DeleteFileByPath } from "@/server/utils/files/application/use-cases/DeleteFileByPath";
import {
	isFileEncryptedByBucket,
	S3FileStorageBucket,
} from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import type { RefreshShelfLegalWeight } from "@/server/modules/warehouse/application/use-cases/RefreshShelfLegalWeight";
import type {
	UpdateAssortmentDefinition,
	UpdateAssortmentDefinitionOptions,
} from "@/server/modules/assortment/application/use-cases/UpdateAssortmentDefinition";
import type { GetAssortmentDefinition } from "@/server/modules/assortment/application/use-cases/GetAssortmentDefinition";
import type { AssortmentVO } from "../dto/shared/AssortmentVO";
import type { UpdateFullAssortmentDefinitionDTO } from "../dto/UpdateFullAssortmentDefinitionDTO";

export class UpdateFullAssortmentDefinition {
	constructor(
		private readonly getAssortmentDefinition: GetAssortmentDefinition,
		private readonly updateAssortmentDefinition: UpdateAssortmentDefinition,
		private readonly getAllAssortment: GetAllAssortment,
		private readonly validateShelf: ValidateShelf,
		private readonly refreshShelfLegalWeight: RefreshShelfLegalWeight,
		private readonly fetchFile: FetchFile,
		private readonly deleteFileByPath: DeleteFileByPath,
		private readonly uploadFile: UploadFile
	) {}

	private getUpdateOptions(): UpdateAssortmentDefinitionOptions {
		return {
			fetchAssortmentImage: async (id) =>
				await this.fetchFile.execute(
					{ id: id.value, metadata: { bucket: S3FileStorageBucket.ASSORTMENT_IMAGES } },
					{ skipAuthentication: true }
				),
			deleteProductImageByPath: async (path) =>
				await this.deleteFileByPath.execute(
					{
						path,
						metadata: { bucket: S3FileStorageBucket.ASSORTMENT_IMAGES },
					},
					{ skipAuthentication: true }
				),
			addAssortmentImageByBase64: async (path, contentBase64) => {
				const file = await this.uploadFile.execute(
					{
						path,
						contentBase64,
						mimeType: "image/png",
						metadata: { bucket: S3FileStorageBucket.ASSORTMENT_IMAGES },
						isEncrypted: isFileEncryptedByBucket(S3FileStorageBucket.ASSORTMENT_IMAGES),
					},
					{ skipAuthentication: true }
				);
				return FileReferenceMapper.fromDTOToEntity(file);
			},
		};
	}

	async execute(dto: UpdateFullAssortmentDefinitionDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const updateOptions = this.getUpdateOptions();

		const currentDefinition = await this.getAssortmentDefinition.execute({ id: dto.id }, { skipAuthentication: true });

		const allAssortments = await this.getAllAssortment.execute();
		const allAssortmentsWithUpdatedDefinition = allAssortments.map((assortment) => ({
			...assortment,
			definition: {
				...dto.newData,
				qrCode: assortment.definition.qrCode,
				image: assortment.definition.image,
				id: assortment.definition.id,
			},
		}));

		const shelfIdsUsingDefinition = allAssortments
			.map((assortment) => {
				const usingDefinition = assortment.definition.id === currentDefinition.id;
				if (usingDefinition) return assortment.shelfId;
			})
			.filter((value) => value !== undefined);
		const uniqueShelfIdsUsingDefinition = [...new Set(shelfIdsUsingDefinition)];

		const assortmentContext = assortmentDTOsToAssortmentVOs(allAssortmentsWithUpdatedDefinition);
		const validatedShelfIds = [];
		for (const shelfId of uniqueShelfIdsUsingDefinition) {
			await this.validateUpatedAssortmentByShelfId(assortmentContext, shelfId);
			validatedShelfIds.push(shelfId);
		}

		const updatedDefinition = await this.updateAssortmentDefinition.execute(dto, {
			...updateOptions,
			skipAuthentication: true,
		});

		for (const validatedShelfId of validatedShelfIds) {
			await this.refreshShelfLegalWeight.execute({ id: validatedShelfId, assortmentContext });
		}

		return updatedDefinition;
	}

	async validateUpatedAssortmentByShelfId(updatedAssortment: AssortmentVO[], shelfId: string) {
		const shelfIdentification = { id: shelfId, assortmentContext: updatedAssortment };
		await this.validateShelf.execute(shelfIdentification);
	}
}
