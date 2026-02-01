import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { FileReference } from "@/server/utils/files/domain/entities/FileReference";
import type { UpdateAssortmentDefinitionDTO } from "../dto/UpdateAssortmentDTO";
import type { Base64UploadFunction, DeleteProductImageByPathFunction, FileFetcher } from "../helpers/AssortmentHelper";
import type { AssortmentFileHelper } from "../services/AssortmentFileHelper";
import type { AssortmentDefinitionHelper } from "../helpers/AssortmentDefinitionHelper";
import type { AssortmentDefinitionRepository } from "../../domain/repositories/AssortmentDefinitionRepository";
import type { AssortmentDefinition } from "../../domain/entities/AssortmentDefinition";
import { AssortmentDefinitionMapper } from "../../infrastructure/mappers/AssortmentDefinitionMapper";

export type UpdateAssortmentDefinitionOptions = {
	deleteProductImageByPath: DeleteProductImageByPathFunction;
	addAssortmentImageByBase64: Base64UploadFunction;
	fetchAssortmentImage: FileFetcher;
};

const handleImageUpdate = async (
	currentImageBase64: string | null,
	newImageBase64: string | null,
	definition: AssortmentDefinition,
	options: UpdateAssortmentDefinitionOptions
): Promise<FileReference | null> => {
	const imageHasChanged = currentImageBase64 !== newImageBase64;
	if (!imageHasChanged) return definition.image;

	if (definition.image !== null) await options.deleteProductImageByPath(definition.image.path);
	if (newImageBase64 === null) return null;

	return await options.addAssortmentImageByBase64(`${definition.id.value}.png`, newImageBase64);
};

export class UpdateAssortmentDefinition {
	constructor(
		private readonly assortmentDefinitionRepository: AssortmentDefinitionRepository,
		private readonly assortmentDefinitionHelper: AssortmentDefinitionHelper,
		private readonly assortmentFileHelper: AssortmentFileHelper
	) {}

	async execute(dto: UpdateAssortmentDefinitionDTO, options: UpdateAssortmentDefinitionOptions, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const { fetchAssortmentImage } = options;

		const definition = await this.assortmentDefinitionHelper.getByIdStringOrThrow(
			dto.id,
			this.assortmentFileHelper.fileGetter
		);
		const currentImage = definition.image === null ? null : await fetchAssortmentImage(definition.image.id);
		const newImageBase64 = dto.newData.imageContentBase64;

		const newImage = await handleImageUpdate(currentImage?.base64 ?? null, newImageBase64, definition, options);

		const newDefinition = AssortmentDefinitionMapper.fromDTOToEntity({
			...dto.newData,
			id: dto.id,
			qrCode: FileReferenceMapper.fromEntityToDTO(definition.qrCode),
			image: newImage === null ? null : FileReferenceMapper.fromEntityToDTO(newImage),
		});

		const { weight, size, expiresAfter, isHazardous, name, temperatureRange, comment, image } = newDefinition;
		definition.weight = weight;
		definition.size = size;
		definition.expiresAfter = expiresAfter;
		definition.isHazardous = isHazardous;
		definition.name = name;
		definition.temperatureRange = temperatureRange;
		definition.comment = comment;
		definition.image = image;
		await this.assortmentDefinitionRepository.update(definition);

		return AssortmentDefinitionMapper.fromEntityToDTO(definition);
	}
}
