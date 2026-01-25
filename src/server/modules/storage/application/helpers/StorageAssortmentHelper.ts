import { CreateAssortment } from "@/server/modules/assortment/application/use-cases/CreateAssortment";
import { DeleteAssortment } from "@/server/modules/assortment/application/use-cases/DeleteAssortment";
import { FillCell } from "@/server/modules/warehouse/application/use-cases/FillCell";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import { EmptyCell } from "@/server/modules/warehouse/application/use-cases/EmptyCell";
import { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { UserDTO, UUID } from "@/server/utils";
import { GenerateQRCode } from "@/server/utils/qr-codes/application/use-cases/GenerateQRCode";
import { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import { QRCode } from "@/server/utils/qr-codes/domain/entities/QRCode";
import { PositiveNumber } from "@/server/utils/numbers/positive";
import { FileReference } from "@/server/utils/files/domain/entities/FileReference";
import { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import { DeleteFileByPath } from "@/server/utils/files/application/use-cases/DeleteFileByPath";
import { isFileEncryptedByBucket, S3FileStorageBucket } from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import { AssortmentNoCellError } from "../errors/AssortmentNoCellError";
import { ShelfDTO } from "../dto/shared/ShelfDTO";
import { CellAlreadyTakenError } from "../errors/CellAlreadyTakenError";
import { TakeDownAssortmentDTO } from "../dto/TakeDownAssortmentDTO";
import { PutUpAssortmentDTO } from "../dto/PutUpAssortmentDTO";
import { AssortmentDTO } from "../dto/shared/AssortmentDTO";
import { CreateAssortmentDTO } from "../dto/shared/CreateAssortmentDTO";
import { ImportAndReplaceAssortmentDTO } from "../dto/ImportAndReplaceAssortmentDTO";
import { PutUpAssortmentResponseDTO } from "../dto/PutUpAssortmentResponseDTO";

type SupportedFileLocation = S3FileStorageBucket.ASSORTMENT_IMAGES | S3FileStorageBucket.QR_CODES;

export interface StorageAssortmentHelper {
	putUpAssortmentByDTO(dto: PutUpAssortmentDTO, currentUser: UserDTO): Promise<PutUpAssortmentResponseDTO>;
	takeDownAssortmentByDTO(dto: TakeDownAssortmentDTO, currentUser: UserDTO): Promise<ShelfDTO>;
	importAndReplaceAssortment(dto: ImportAndReplaceAssortmentDTO, currentUser: UserDTO): Promise<AssortmentDTO[]>;
};

export class DefaultStorageAssortmentHelper implements StorageAssortmentHelper {
	constructor(
		private readonly getAllAssortment: GetAllAssortment,
		private readonly getAssortment: GetAssortment,
		private readonly createAssortment: CreateAssortment,
		private readonly deleteAssortment: DeleteAssortment,
		private readonly getShelf: GetShelf,
		private readonly fillCell: FillCell,
		private readonly emptyCell: EmptyCell,
		private readonly generateQRCode: GenerateQRCode,
		private readonly uploadFileProductImages: UploadFile,
		private readonly uploadFileQRCodes: UploadFile,
		private readonly deleteFileProductImage: DeleteFileByPath,
		private readonly deleteFileQRCode: DeleteFileByPath,
		private readonly fetchFileProductImage: FetchFile,
	) { }

	private async uploadImageByBase64(
		location: SupportedFileLocation,
		path: string,
		base64: string,
		currentUser?: UserDTO,
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
			undefined,
			currentUser,
		);
		return FileReferenceMapper.fromDTOToEntity(fileReferenceDTO);
	}

	private async getQRCodeBase64ById(id: string, currentUser?: UserDTO): Promise<FileReference> {
		const qrCode = QRCode.create(id, PositiveNumber.create(500));
		const generatedCode = await this.generateQRCode.execute({
			qrCode: {
				data: qrCode.data,
				size: qrCode.size.value,
			},
		});
		return await this.uploadImageByBase64(S3FileStorageBucket.QR_CODES, `${id}.png`, generatedCode.base64, currentUser);
	}

	private async deleteFileByPath(location: SupportedFileLocation, path: string, currentUser?: UserDTO) {
		const executor = location === S3FileStorageBucket.QR_CODES ? this.deleteFileQRCode : this.deleteFileProductImage;
		await executor.execute(
			{
				path,
				metadata: { bucket: location },
			},
			currentUser
		);
	}

	// Removes the assortment the DB and its related files from S3.
	private async deleteAssortmentFull(assortment: AssortmentDTO, currentUser?: UserDTO) {
		await this.deleteAssortment.execute(
			{ id: assortment.id },
			{
				deleteProductImageByPath:
					async (path: string) => await this.deleteFileByPath(S3FileStorageBucket.ASSORTMENT_IMAGES, path, currentUser),
				deleteQRCodeByPath:
					async (path: string) => await this.deleteFileByPath(S3FileStorageBucket.QR_CODES, path, currentUser),
			},
			currentUser,
		);
	}

	private async takeDownAssortments(assortments: AssortmentDTO[], currentUser: UserDTO) {
		for (const assortment of assortments) {
			await this.takeDownAssortmentByDTO({ id: assortment.id }, currentUser);
		}
	}

	private async putUpAssortments(assortments: CreateAssortmentDTO[], currentUser: UserDTO) {
		for (const assortment of assortments) {
			await this.putUpAssortmentByDTO(
				{ shelfId: assortment.shelfId, cellId: assortment.cellId, assortment: assortment },
				currentUser
			);
		}
	}

	async putUpAssortmentByDTO(dto: PutUpAssortmentDTO, currentUser: UserDTO) {
		let assortments;

		assortments = await this.getAllAssortment.execute();
		const shelf = await this.getShelf.execute({ id: dto.shelfId, assortmentContext: assortments });
		const cellId = UUID.fromString(dto.cellId);
		const cellToUpdate = shelf.cells.flat().find((cell) => cell.id === cellId.value);
		if (cellToUpdate?.assortment !== null && cellToUpdate?.assortment !== undefined) throw new CellAlreadyTakenError(cellId);

		const assortment = await this.createAssortment.execute(
			{
				...dto.assortment,
				cellId: dto.cellId,
				shelfId: dto.shelfId,
			},
			{
				getQRCode: async (id) => await this.getQRCodeBase64ById(id, currentUser),
				addAssortmentImageByBase64:
					async (path, base64) => await this.uploadImageByBase64(S3FileStorageBucket.ASSORTMENT_IMAGES, path, base64, currentUser),
			},
			currentUser,
		);
		assortments = await this.getAllAssortment.execute();
		try {
			await this.fillCell.execute(
				{
					shelf: {
						id: dto.shelfId,
						assortmentContext: assortments,
					},
					cellId: dto.cellId,
					assortment,
				},
				currentUser,
			);
		} catch (error) {
			await this.deleteAssortmentFull(assortment, currentUser);

			throw error;
		}

		assortments = await this.getAllAssortment.execute();
		const newShelf = await this.getShelf.execute({ id: dto.shelfId, assortmentContext: assortments });
		return {
			shelf: newShelf,
			newAssortment: assortment,
		};
	}

	async takeDownAssortmentByDTO(dto: TakeDownAssortmentDTO, currentUser: UserDTO) {
		const assortment = await this.getAssortment.execute({ id: dto.id });
		const assortments = await this.getAllAssortment.execute();
		const shelf = await this.getShelf.execute({ id: assortment.shelfId, assortmentContext: assortments });

		const cellToUpdate = shelf.cells.flat().find((cell) => cell.id === assortment.cellId);

		if (!cellToUpdate)
			throw new AssortmentNoCellError(UUID.fromString(assortment.id), UUID.fromString(assortment.cellId));

		if (cellToUpdate.assortment === null) return shelf;

		cellToUpdate.assortment = null;
		await this.deleteAssortmentFull(assortment, currentUser);
		const newAssortments = await this.getAllAssortment.execute();
		return await this.emptyCell.execute(
			{
				cellId: cellToUpdate.id,
				shelf: {
					id: cellToUpdate.shelfId,
					assortmentContext: newAssortments,
				},
			},
			currentUser
		);
	}

	async importAndReplaceAssortment(dto: ImportAndReplaceAssortmentDTO, currentUser: UserDTO) {
		const currentAssortments = await this.getAllAssortment.execute();
		const fullCurrentAssortments = await Promise.all(currentAssortments.map(async (assortment) => {
			const imageContentBase64 = assortment.image?.id
				? (await this.fetchFileProductImage.execute(
					{
						id: assortment.image?.id,
						metadata: { bucket: S3FileStorageBucket.ASSORTMENT_IMAGES }
					},
					{ skipAuthentication: true },
				)).base64
				: null;
			return { ...assortment, imageContentBase64 };
		}));

		try {
			await this.takeDownAssortments(currentAssortments, currentUser);
			await this.putUpAssortments(dto.assortment, currentUser);
			return await this.getAllAssortment.execute();
		} catch (error) {
			// Attempt to rollback the changes if an error occurred.
			const newAssortments = await this.getAllAssortment.execute();
			await this.takeDownAssortments(newAssortments, currentUser);
			await this.putUpAssortments(
				fullCurrentAssortments,
				currentUser,
			);

			throw error;
		}
	}
}
