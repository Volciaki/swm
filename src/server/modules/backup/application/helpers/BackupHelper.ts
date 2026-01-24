import { ZipFile } from "yazl";
import { getStreamAsBuffer as streamToBuffer } from "get-stream";
import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import { S3FileStorageBucket } from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import { UUID, UUIDManager, Base64Mapper } from "@/server/utils";
import { Backup } from "../../domain/entities/Backup";
import { BackupRepository } from "../../domain/repositories/BackupRepository";
import { FileStorageDataManager } from "../services/FileStorageDataManager";
import { DatabaseDataManager } from "../services/DatabaseDataManager";
import { BackupNotFoundError } from "../errors/NoBackupUtilitiesError";

export interface BackupHelper {
	take(): Promise<Backup>;
	apply(backup: Backup): Promise<void>;
	getByIdStringOrThrow(id: string): Promise<Backup>;
};

export class DefaultBackupHelper implements BackupHelper {
	constructor(
		private readonly fileStorageDataManager: FileStorageDataManager,
		private readonly databaseDataManager: DatabaseDataManager,
		private readonly uploadBackupFile: UploadFile,
		private readonly uuidManager: UUIDManager,
		private readonly backupRepository: BackupRepository,
		private readonly getFile: GetFile,
	) { }

	async take(): Promise<Backup> {
		const fileStorageDataDump = await this.fileStorageDataManager.dump();
		const databaseDataDump = await this.databaseDataManager.dump();

		const backupFile = new ZipFile();

		const databasePathPrefix = "database";

		const fileStoragePathPrefix = "file-storage";
		const assortmentImagesPath = `${fileStoragePathPrefix}/${S3FileStorageBucket.ASSORTMENT_IMAGES}`;
		const qrCodesPath = `${fileStoragePathPrefix}/${S3FileStorageBucket.QR_CODES}`;
		const reportsPath = `${fileStoragePathPrefix}/${S3FileStorageBucket.REPORTS}`;

		backupFile.addEmptyDirectory(`${fileStoragePathPrefix}/`);
		backupFile.addEmptyDirectory(`${assortmentImagesPath}/`);
		backupFile.addEmptyDirectory(`${qrCodesPath}/`);
		backupFile.addEmptyDirectory(`${reportsPath}/`);

		backupFile.addEmptyDirectory(`${databasePathPrefix}/`);

		for (const assortmentImage of fileStorageDataDump.assortments.images) {
			const fileBuffer = Base64Mapper.toBuffer(assortmentImage.base64);
			backupFile.addBuffer(fileBuffer, `${assortmentImagesPath}/${assortmentImage.path}`);
		}

		for (const qrCode of fileStorageDataDump.assortments.qrCodes) {
			const fileBuffer = Base64Mapper.toBuffer(qrCode.base64);
			backupFile.addBuffer(fileBuffer, `${qrCodesPath}/${qrCode.path}`);
		}

		for (const report of fileStorageDataDump.reports) {
			const fileBuffer = Base64Mapper.toBuffer(report.base64);
			backupFile.addBuffer(fileBuffer, `${reportsPath}/${report.path}`);
		}

		backupFile.addBuffer(databaseDataDump.sqlExportBuffer, `${databasePathPrefix}/dump.sql`);

		backupFile.end();

		const backupFileBuffer = await streamToBuffer(backupFile.outputStream);
		const backupFileBase64 = Base64Mapper.fromBuffer(backupFileBuffer);

		const backupId = this.uuidManager.generate();

		const backupFileReference = await this.uploadBackupFile.execute(
			{
				path: `${backupId.value}.zip`,
				mimeType: "application/zip",
				metadata: { bucket: S3FileStorageBucket.BACKUPS },
				contentBase64: backupFileBase64.value,
			},
			{ skipAuthentication: true },
		);

		const now = new Date();
		const backup = Backup.create(
			backupId,
			now,
			FileReferenceMapper.fromDTOToEntity(backupFileReference),
		);

		await this.backupRepository.create(backup);

		return backup;
	}

	async apply(backup: Backup) {

	}

	async getByIdStringOrThrow(id: string) {
		const backupId = UUID.fromString(id);
		const backup = await this.backupRepository.getById(
			backupId,
			async (uuid: UUID) => {
				const dto = await this.getFile.execute({ id: uuid.value })
				return FileReferenceMapper.fromDTOToEntity(dto);
			},
		);

		if (backup === null) throw new BackupNotFoundError(backupId);

		return backup;
	}
}
