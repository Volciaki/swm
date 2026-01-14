import { UUID, UUIDManager } from "@/server/utils";
import { FileReference } from "@/server/utils/files/domain/entities/FileReference";
import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import { Assortment } from "../../domain/entities/Assortment";
import { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import { AssortmentNotFoundError } from "../errors/AssortmentNotFound";
import { CreateAssortmentDTO } from "../dto/shared/CreateAssortmentDTO";
import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";

export type FileGetter = (id: UUID) => Promise<FileReference>;
export type QRCodeGetter = (value: string) => Promise<FileReference>;
export type Base64UploadFunction = (path: string, value: string) => Promise<FileReference>;

type DeleteFileByPath = (path: string) => Promise<void>;
export type DeleteQRCodeByPath = DeleteFileByPath;
export type DeleteProductImageByPathFunction = DeleteFileByPath;

export interface AssortmentHelper {
	getByIdStringOrThrow(id: string, getFile: FileGetter): Promise<Assortment>;
	createByDTO(
		dto: CreateAssortmentDTO,
		getQRCode: QRCodeGetter,
		uploadBase64Image: Base64UploadFunction,
	): Promise<Assortment>;
	delete(
		assortment: Assortment,
		deleteQRCodeByPath: DeleteQRCodeByPath,
		deleteImageByPath: DeleteProductImageByPathFunction,
	): Promise<void>;
};

export class DefaultAssortmentHelper implements AssortmentHelper {
	constructor(
		private readonly assortmentRepository: AssortmentRepository,
		private readonly uuidManager: UUIDManager,
	) { }

	async getByIdStringOrThrow(id: string, getFile: FileGetter) {
		const assortmentId = UUID.fromString(id);
		const assortment = await this.assortmentRepository.getById(
			assortmentId,
			async (id) => getFile(id),
		);

		if (assortment === null) throw new AssortmentNotFoundError(assortmentId);

		return assortment;
	}

	async createByDTO(
		dto: CreateAssortmentDTO,
		getQRCode: QRCodeGetter,
		addAssortmentImageByBase64: Base64UploadFunction,
	) {
		const assortmentId = this.uuidManager.generate().value;
		const qrCode = await getQRCode(assortmentId);
		const image = dto.imageContentBase64 === null
			? null
			: await addAssortmentImageByBase64(`${assortmentId}.png`, dto.imageContentBase64);

		const assortment = AssortmentMapper.fromAssortmentDTOToAssortment(
			{
				...dto,
				id: assortmentId,
				storedAtTimestamp: (new Date()).getTime(),
				qrCode: FileReferenceMapper.fromEntityToDTO(qrCode),
				image: image === null ? null : FileReferenceMapper.fromEntityToDTO(image),
			},
		);
		await this.assortmentRepository.create(assortment);
		return assortment;
	}

	async delete(
		assortment: Assortment,
		deleteQRCodeByPath: DeleteQRCodeByPath,
		deleteImageByPath: DeleteProductImageByPathFunction,
	) {
		await this.assortmentRepository.delete(assortment);
		await deleteQRCodeByPath(assortment.qrCode.path);
		
		if (assortment.image === null) return;

		await deleteImageByPath(assortment.image.path);
	}
}
