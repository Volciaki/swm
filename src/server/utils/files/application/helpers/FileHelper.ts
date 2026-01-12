import { UUID, UUIDManager } from "@/server/utils/uuid";
import { FileReference } from "../../domain/entities/FileReference";
import { FileReferenceRepository } from "../../domain/services/FileReferenceRepository";
import { UploadFileDTO } from "../dto/UploadFileDTO";
import { FileReferenceMapper } from "../../infrastructure/mappers/FileReferenceMapper";
import { Base64, Base64Mapper } from "@/server/utils/base64";
import { Visibility } from "../../domain/entities/Visibility";
import { VisibilityMapper } from "../../infrastructure/mappers/VisibilityMapper";
import { FileNotFoundError } from "../errors/FileNotFoundError";

const getSizeBytesByBase64String = (content: string): number => {
	const base64 = Base64.fromString(content);
	const buffer = Base64Mapper.toBuffer(base64);
	return buffer.length;
};

export interface FileHelper {
	getByIdStringOrThrow(id: string): Promise<FileReference>;
	getByPathOrThrow(path: string): Promise<FileReference>;
	createByDTO(dto: UploadFileDTO, visibility: Visibility): Promise<FileReference>;
};

export class DefaultFileHelper implements FileHelper {
	constructor(
		private readonly fileReferenceRepository: FileReferenceRepository,
		private readonly uuidManager: UUIDManager,
	) { }

	async getByIdStringOrThrow(idString: string) {
		const id = UUID.fromString(idString);
		const entity = await this.fileReferenceRepository.getById(id);

		if (entity === null) throw new FileNotFoundError("ID", id.value);

		return entity;
	}

	async getByPathOrThrow(path: string) {
		const entity = await this.fileReferenceRepository.getByPath(path);

		if (entity === null) throw new FileNotFoundError("path", path);

		return entity;
	}

	async createByDTO(dto: UploadFileDTO, visibility: Visibility) {
		const sizeBytes = getSizeBytesByBase64String(dto.contentBase64);
		const fileReference = FileReferenceMapper.fromDTOToEntity({
			...dto,
			id: this.uuidManager.generate().value,
			sizeBytes: sizeBytes,
			visibility: VisibilityMapper.toDTO(visibility),
		});
		await this.fileReferenceRepository.create(fileReference);
		return fileReference;
	}
}
