import type { FileContextByIDGetter } from "@/server/utils/files/domain/types/FileContextByIDGetter";
import type { FileReference } from "@/server/utils/files/domain/entities/FileReference";
import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import type { FetchFileResponseDTO } from "@/server/utils/files/application/dto/FetchFileResponseDTO";
import type { UUIDManager } from "@/server/utils";
import { UUID } from "@/server/utils";
import { AssortmentDefinitionNotFoundError } from "../errors/AssortmentDefinitionNotFound";
import { AssortmentDefinitionMapper } from "../../infrastructure/mappers/AssortmentDefinitionMapper";
import type { AssortmentDefinition } from "../../domain/entities/AssortmentDefinition";
import type { AssortmentDefinitionRepository } from "../../domain/repositories/AssortmentDefinitionRepository";
import type { CreateAssortmentDefinitionDTO } from "../dto/shared/CreateAssortmentDefinitionDTO";

export type FileGetter = FileContextByIDGetter;
export type FileFetcher = (id: UUID) => Promise<FetchFileResponseDTO>;
export type QRCodeGetter = (value: string) => Promise<FileReference>;
export type Base64UploadFunction = (path: string, value: string) => Promise<FileReference>;

type DeleteFileByPath = (path: string) => Promise<void>;
export type DeleteQRCodeByPath = DeleteFileByPath;
export type DeleteProductImageByPathFunction = DeleteFileByPath;

export interface AssortmentDefinitionHelper {
	getByIdStringOrThrow(id: string, getFile: FileGetter): Promise<AssortmentDefinition>;
	createByDTO(
		dto: CreateAssortmentDefinitionDTO,
		getQRCode: QRCodeGetter,
		uploadBase64Image: Base64UploadFunction
	): Promise<AssortmentDefinition>;
	delete(
		definition: AssortmentDefinition,
		deleteQRCodeByPath: DeleteQRCodeByPath,
		deleteImageByPath: DeleteProductImageByPathFunction
	): Promise<void>;
}

export class DefaultAssortmentDefinitionHelper implements AssortmentDefinitionHelper {
	constructor(
		private readonly assortmentDefinitionRepository: AssortmentDefinitionRepository,
		private readonly uuidManager: UUIDManager
	) {}

	async getByIdStringOrThrow(id: string, getFile: FileGetter) {
		const definitionId = UUID.fromString(id);
		const definition = await this.assortmentDefinitionRepository.getById(definitionId, async (id) => getFile(id));

		if (definition === null) throw new AssortmentDefinitionNotFoundError({ id: definitionId.value });

		return definition;
	}

	async createByDTO(
		dto: CreateAssortmentDefinitionDTO,
		getQRCode: QRCodeGetter,
		addAssortmentImageByBase64: Base64UploadFunction
	) {
		const definitionId = this.uuidManager.generate().value;
		const image =
			dto.imageContentBase64 === null
				? null
				: await addAssortmentImageByBase64(`${definitionId}.png`, dto.imageContentBase64);
		const qrCode = await getQRCode(definitionId);

		const definition = AssortmentDefinitionMapper.fromDTOToEntity({
			...dto,
			id: definitionId,
			qrCode: FileReferenceMapper.fromEntityToDTO(qrCode),
			image: image === null ? null : FileReferenceMapper.fromEntityToDTO(image),
		});
		await this.assortmentDefinitionRepository.create(definition);
		return definition;
	}

	async delete(
		definition: AssortmentDefinition,
		deleteQRCodeByPath: DeleteQRCodeByPath,
		deleteImageByPath: DeleteProductImageByPathFunction
	) {
		await this.assortmentDefinitionRepository.delete(definition);
		await deleteQRCodeByPath(definition.qrCode.path);

		if (definition.image === null) return;

		await deleteImageByPath(definition.image.path);
	}
}
