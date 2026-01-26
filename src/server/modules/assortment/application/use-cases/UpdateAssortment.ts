import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { FileReference } from "@/server/utils/files/domain/entities/FileReference";
import type { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import type { UpdateAssortmentDTO } from "../dto/UpdateAssortmentDTO";
import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";
import type {
	AssortmentHelper,
	Base64UploadFunction,
	DeleteProductImageByPathFunction,
	FileFetcher,
} from "../helpers/AssortmentHelper";
import type { AssortmentFileHelper } from "../services/AssortmentFileHelper";
import type { Assortment } from "../../domain/entities/Assortment";

export type UpdateAssortmentOptions = {
	deleteProductImageByPath: DeleteProductImageByPathFunction;
	addAssortmentImageByBase64: Base64UploadFunction;
	fetchAssortmentImage: FileFetcher;
};

const handleImageUpdate = async (
	currentImageBase64: string | null,
	newImageBase64: string | null,
	assortment: Assortment,
	options: UpdateAssortmentOptions
): Promise<FileReference | null> => {
	const imageHasChanged = currentImageBase64 !== newImageBase64;
	if (!imageHasChanged) return assortment.image;

	if (assortment.image !== null) await options.deleteProductImageByPath(assortment.image.path);
	if (newImageBase64 === null) return null;

	return await options.addAssortmentImageByBase64(`${assortment.id.value}.png`, newImageBase64);
};

export class UpdateAssortment {
	constructor(
		private readonly assortmentRepository: AssortmentRepository,
		private readonly assortmentHelper: AssortmentHelper,
		private readonly assortmentFileHelper: AssortmentFileHelper
	) {}

	async execute(dto: UpdateAssortmentDTO, options: UpdateAssortmentOptions, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const { fetchAssortmentImage } = options;

		const assortment = await this.assortmentHelper.getByIdStringOrThrow(dto.id, this.assortmentFileHelper.fileGetter);
		const currentImage = assortment.image === null ? null : await fetchAssortmentImage(assortment.image.id);
		const newImageBase64 = dto.newData.imageContentBase64;

		const newImage = await handleImageUpdate(currentImage?.base64 ?? null, newImageBase64, assortment, options);

		const newAssortment = AssortmentMapper.fromAssortmentDTOToAssortment({
			...dto.newData,
			id: dto.id,
			cellId: assortment.cellId.value,
			shelfId: assortment.shelfId.value,
			storedAtTimestamp: assortment.storedAt.getTime(),
			qrCode: FileReferenceMapper.fromEntityToDTO(assortment.qrCode),
			image: newImage === null ? null : FileReferenceMapper.fromEntityToDTO(newImage),
			hasExpired: false,
			hasExpiredNotification: null,
			isCloseToExpiration: false,
			isCloseToExpirationNotification: null,
		});

		const { weight, size, expiresAfter, isHazardous, name, temperatureRange, comment, image } = newAssortment;
		assortment.weight = weight;
		assortment.size = size;
		assortment.expiresAfter = expiresAfter;
		assortment.isHazardous = isHazardous;
		assortment.name = name;
		assortment.temperatureRange = temperatureRange;
		assortment.comment = comment;
		assortment.image = image;
		await this.assortmentRepository.update(assortment);

		return AssortmentMapper.fromAssortmentToAssortmentDTO(assortment);
	}
}
