import type { FileContextByIDGetter } from "@/server/utils/files/domain/types/FileContextByIDGetter";
import type { FileReference } from "@/server/utils/files/domain/entities/FileReference";
import type { FetchFileResponseDTO } from "@/server/utils/files/application/dto/FetchFileResponseDTO";
import type { UserDTO, UUIDManager } from "@/server/utils";
import { UUID } from "@/server/utils";
import type { Assortment } from "../../domain/entities/Assortment";
import type { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import { AssortmentNotFoundError } from "../errors/AssortmentNotFound";
import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";
import type { CreateAssortmentDTO } from "../dto/CreateAssortmentDTO";
import { AssortmentDefinitionMapper } from "../../infrastructure/mappers/AssortmentDefinitionMapper";
import type { AssortmentDefinition } from "../../domain/entities/AssortmentDefinition";

export type FileGetter = FileContextByIDGetter;
export type FileFetcher = (id: UUID) => Promise<FetchFileResponseDTO>;
export type QRCodeGetter = (value: string) => Promise<FileReference>;
export type Base64UploadFunction = (path: string, value: string) => Promise<FileReference>;
export type DefinitionContextByIdGetter = (id: UUID) => Promise<AssortmentDefinition>;

type DeleteFileByPath = (path: string) => Promise<void>;
export type DeleteQRCodeByPath = DeleteFileByPath;
export type DeleteProductImageByPathFunction = DeleteFileByPath;

export interface AssortmentHelper {
	getByIdStringOrThrow(id: string, getDefinitionContextById: DefinitionContextByIdGetter): Promise<Assortment>;
	createByDTO(
		dto: CreateAssortmentDTO,
		getDefinitionContextById: DefinitionContextByIdGetter,
		currentUser: UserDTO
	): Promise<Assortment>;
	getAll(getDefinitionContextById: DefinitionContextByIdGetter): Promise<Assortment[]>;
}

export class DefaultAssortmentHelper implements AssortmentHelper {
	constructor(
		private readonly assortmentRepository: AssortmentRepository,
		private readonly uuidManager: UUIDManager
	) {}

	async getByIdStringOrThrow(id: string, getDefinitionContextById: DefinitionContextByIdGetter) {
		const assortmentId = UUID.fromString(id);
		const assortment = await this.assortmentRepository.getById(assortmentId, async (id) =>
			getDefinitionContextById(id)
		);

		if (assortment === null) throw new AssortmentNotFoundError({ id: assortmentId.value });

		return assortment;
	}

	async createByDTO(
		dto: CreateAssortmentDTO,
		getDefinitionContextById: DefinitionContextByIdGetter,
		currentUser: UserDTO
	) {
		const assortmentId = this.uuidManager.generate().value;
		const assortmentDefinition = await getDefinitionContextById(UUID.fromString(dto.definitionId));
		const assortment = AssortmentMapper.fromAssortmentDTOToAssortment({
			...dto,
			definition: AssortmentDefinitionMapper.fromEntityToDTO(assortmentDefinition),
			id: assortmentId,
			storedAtTimestamp: new Date().getTime(),
			hasExpired: false,
			hasExpiredNotification: null,
			isCloseToExpiration: false,
			isCloseToExpirationNotification: null,
			putUpByUserId: currentUser.id,
		});
		await this.assortmentRepository.create(assortment);
		return assortment;
	}

	async getAll(getDefinitionContextById: DefinitionContextByIdGetter) {
		const allAssortments = await this.assortmentRepository.getAll(async (id) => getDefinitionContextById(id));
		return allAssortments;
	}
}
