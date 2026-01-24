import { ZipFile } from "yazl";
import { getStreamAsBuffer as streamToBuffer } from "get-stream";
import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import { S3FileStorageBucket } from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import { Base64Mapper, UUIDManager } from "@/server/utils";
import { Backup } from "../../domain/entities/Backup";
import { BackupRepository } from "../../domain/repositories/BackupRepository";
import { FileStorageDataManager } from "../services/FileStorageDataManager";

export interface BackupHelper {
	take(): Promise<Backup>;
	apply(backup: Backup): Promise<void>;
};

export class DefaultBackupHelper implements BackupHelper {
	constructor(
		private readonly fileStorageDataManager: FileStorageDataManager,
		private readonly uploadBackupFile: UploadFile,
		private readonly uuidManager: UUIDManager,
		private readonly backupRepository: BackupRepository,
	) { }

	async take(): Promise<Backup> {
		const fileStorageDataDump = await this.fileStorageDataManager.dump();

		const backupFile = new ZipFile();

		const fileStoragePathPrefix = `file-storage`
		const assortmentImagesPath = `${fileStoragePathPrefix}/${S3FileStorageBucket.ASSORTMENT_IMAGES}`;
		const qrCodesPath = `${fileStoragePathPrefix}/${S3FileStorageBucket.QR_CODES}`;
		const reportsPath = `${fileStoragePathPrefix}/${S3FileStorageBucket.REPORTS}`;

		backupFile.addEmptyDirectory(`${fileStoragePathPrefix}/`);
		backupFile.addEmptyDirectory(`${assortmentImagesPath}/`);
		backupFile.addEmptyDirectory(`${qrCodesPath}/`);
		backupFile.addEmptyDirectory(`${reportsPath}/`);

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
}
