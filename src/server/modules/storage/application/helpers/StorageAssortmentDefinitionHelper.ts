import type { GenerateQRCode } from "@/server/utils/qr-codes/application/use-cases/GenerateQRCode";
import type { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import { QRCode } from "@/server/utils/qr-codes/domain/entities/QRCode";
import { PositiveNumber } from "@/server/utils/numbers/positive";
import type { FileReference } from "@/server/utils/files/domain/entities/FileReference";
import type { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import type { DeleteFileByPath } from "@/server/utils/files/application/use-cases/DeleteFileByPath";
import {
	isFileEncryptedByBucket,
	S3FileStorageBucket,
} from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import type { DeleteAssortmentDefinition } from "@/server/modules/assortment/application/use-cases/DeleteAssortmentDefinition";
import type { GetAssortmentDefinition } from "@/server/modules/assortment/application/use-cases/GetAssortmentDefinition";
import type { CreateAssortmentDefinition } from "@/server/modules/assortment/application/use-cases/CreateAssortmentDefinition";
import type { GetAllAssortmentDefinitions } from "@/server/modules/assortment/application/use-cases/GetAllAssortmentDefinitions";
import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { ImportAndReplaceAssortmentDefinitionsDTO } from "../dto/ImportAndReplaceAssortmentDefinitionsDTO";
import type { AssortmentDefinitionDTO } from "../dto/shared/AssortmentDefinitionDTO";
import type { DeleteAssortmentDefinitionDTO } from "../dto/DeleteAssortmentDefinitionDTO";
import type { CreateAssortmentDefinitionDTO } from "../dto/CreateAssortmentDefinitionDTO";
import type { StorageAssortmentHelper } from "./StorageAssortmentHelper";

type SupportedFileLocation = S3FileStorageBucket.ASSORTMENT_IMAGES | S3FileStorageBucket.QR_CODES;

export interface StorageAssortmentDefinitionHelper {
	deleteAssortmentDefinitionByDTO(dto: DeleteAssortmentDefinitionDTO): Promise<void>;
	createAssortmentDefinitionByDTO(dto: CreateAssortmentDefinitionDTO): Promise<AssortmentDefinitionDTO>;
	importAndReplaceAssortmentDefinitions(
		dto: ImportAndReplaceAssortmentDefinitionsDTO
	): Promise<AssortmentDefinitionDTO[]>;
}

export class DefaultStorageAssortmentDefinitionHelper implements StorageAssortmentDefinitionHelper {
	constructor(
		private readonly storageAssortmentHelper: StorageAssortmentHelper,
		private readonly createAssortmentDefinition: CreateAssortmentDefinition,
		private readonly getAssortmentDefinition: GetAssortmentDefinition,
		private readonly getAllAssortmentDefinitions: GetAllAssortmentDefinitions,
		private readonly getAllAssortment: GetAllAssortment,
		private readonly deleteAssortmentDefinition: DeleteAssortmentDefinition,
		private readonly generateQRCode: GenerateQRCode,
		private readonly uploadFileProductImages: UploadFile,
		private readonly uploadFileQRCodes: UploadFile,
		private readonly deleteFileProductImage: DeleteFileByPath,
		private readonly deleteFileQRCode: DeleteFileByPath,
		private readonly fetchFileProductImage: FetchFile
	) {}

	private async uploadImageByBase64(
		location: SupportedFileLocation,
		path: string,
		base64: string
	): Promise<FileReference> {
		const executor = location === S3FileStorageBucket.QR_CODES ? this.uploadFileQRCodes : this.uploadFileProductImages;
		const fileReferenceDTO = await executor.execute(
			{
				path: path,
				contentBase64: base64,
				mimeType: "image/png",
				metadata: { bucket: location },
				isEncrypted: isFileEncryptedByBucket(location),
			},
			{ skipAuthentication: true }
		);
		return FileReferenceMapper.fromDTOToEntity(fileReferenceDTO);
	}

	private async getQRCodeBase64ById(id: string): Promise<FileReference> {
		const qrCode = QRCode.create(id, PositiveNumber.create(500));
		const generatedCode = await this.generateQRCode.execute({
			qrCode: {
				data: qrCode.data,
				size: qrCode.size.value,
			},
		});
		return await this.uploadImageByBase64(S3FileStorageBucket.QR_CODES, `${id}.png`, generatedCode.base64);
	}

	private async deleteFileByPath(location: SupportedFileLocation, path: string) {
		const executor = location === S3FileStorageBucket.QR_CODES ? this.deleteFileQRCode : this.deleteFileProductImage;
		await executor.execute(
			{
				path,
				metadata: { bucket: location },
			},
			{ skipAuthentication: true }
		);
	}

	private async deleteAssortmentDefinitionByDTOs(dtos: DeleteAssortmentDefinitionDTO[]) {
		for (const dto of dtos) {
			await this.deleteAssortmentDefinitionByDTO(dto);
		}
	}

	private async createAssortmentDefinitionByDTOs(dtos: CreateAssortmentDefinitionDTO[]) {
		const definitions = [];

		for (const dto of dtos) {
			const definition = await this.createAssortmentDefinitionByDTO(dto);
			definitions.push(definition);
		}

		return definitions;
	}

	async deleteAssortmentDefinitionByDTO(dto: DeleteAssortmentDefinitionDTO) {
		const definition = await this.getAssortmentDefinition.execute({ id: dto.id }, { skipAuthentication: true });

		const assortments = await this.getAllAssortment.execute();
		const thisDefinitionAssortments = assortments.filter((a) => a.definition.id === definition.id);

		for (const thisDefinitionAssortment of thisDefinitionAssortments) {
			await this.storageAssortmentHelper.takeDownAssortment(thisDefinitionAssortment);
		}

		await this.deleteAssortmentDefinition.execute(
			{ id: definition.id },
			{
				deleteProductImageByPath: async (path: string) =>
					await this.deleteFileByPath(S3FileStorageBucket.ASSORTMENT_IMAGES, path),
				deleteQRCodeByPath: async (path: string) => await this.deleteFileByPath(S3FileStorageBucket.QR_CODES, path),
				skipAuthentication: true,
			}
		);
	}

	async createAssortmentDefinitionByDTO(dto: CreateAssortmentDefinitionDTO) {
		return await this.createAssortmentDefinition.execute(dto, {
			getQRCode: async (id) => await this.getQRCodeBase64ById(id),
			addAssortmentImageByBase64: async (path, base64) =>
				await this.uploadImageByBase64(S3FileStorageBucket.ASSORTMENT_IMAGES, path, base64),
			skipAuthentication: true,
		});
	}

	async importAndReplaceAssortmentDefinitions(dto: ImportAndReplaceAssortmentDefinitionsDTO) {
		const currentDefinitions = await this.getAllAssortmentDefinitions.execute();
		const fullCurrentDefinitions = await Promise.all(
			currentDefinitions.map(async (definition) => {
				// prettier-ignore
				const imageContentBase64 = definition.image?.id
					? (
						await this.fetchFileProductImage.execute(
							{
								id: definition.image?.id,
								metadata: { bucket: S3FileStorageBucket.ASSORTMENT_IMAGES },
							},
							{ skipAuthentication: true }
						)
					).base64
					: null;
				return { ...definition, imageContentBase64 };
			})
		);

		try {
			await this.deleteAssortmentDefinitionByDTOs(currentDefinitions);
			return await this.createAssortmentDefinitionByDTOs(dto.definitions);
		} catch (error) {
			// Attempt to rollback the changes if an error occurred.
			const newDefinitions = await this.getAllAssortmentDefinitions.execute();
			await this.deleteAssortmentDefinitionByDTOs(newDefinitions);
			await this.createAssortmentDefinitionByDTOs(fullCurrentDefinitions);

			throw error;
		}
	}
}
