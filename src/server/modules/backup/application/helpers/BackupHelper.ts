import { ZipFile as ZipFileWritable } from "yazl";
import { fromBuffer as openZIPByBuffer, ZipFile as ZipFileReadable } from "yauzl-promise";
import { getStreamAsBuffer as streamToBuffer } from "get-stream";
import { lookup as getMimeTypeByPath } from "mime-types";
import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import { S3FileStorageBucket } from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import { UUID, UUIDManager, Base64Mapper, Base64 } from "@/server/utils";
import { Backup } from "../../domain/entities/Backup";
import { BackupRepository } from "../../domain/repositories/BackupRepository";
import { AccessedFileStorageDataDump, FileStorageDataManager } from "../services/FileStorageDataManager";
import { DatabaseDataDump, DatabaseDataManager } from "../services/DatabaseDataManager";
import { BackupNotFoundError } from "../errors/NoBackupUtilitiesError";
import { FileStorageType } from "@/server/utils/files/domain/services/FileStorage";
import { InvalidBackupError } from "../errors/InvalidBackupError";

type BackupZIPUnpackedContent = {
	database: DatabaseDataDump;
	fileStorageDump: AccessedFileStorageDataDump;
};

export interface BackupHelper {
	take(): Promise<Backup>;
	apply(backup: Backup): Promise<void>;
	getByIdStringOrThrow(id: string): Promise<Backup>;
};

export class DefaultBackupHelper implements BackupHelper {
	private databasePathPrefix = "database";
	private fileStoragePathPrefix = "file-storage";
	private fileStorageBucketAndPathToIdPath = "bucket-and-path-to-id.json";

	constructor(
		private readonly fileStorageDataManager: FileStorageDataManager,
		private readonly databaseDataManager: DatabaseDataManager,
		private readonly uploadBackupFile: UploadFile,
		private readonly uuidManager: UUIDManager,
		private readonly backupRepository: BackupRepository,
		private readonly getFile: GetFile,
		private readonly fetchBackupFile: FetchFile,
	) { }

	private async handleReadableZipFile(zip: ZipFileReadable): Promise<BackupZIPUnpackedContent> {
		let databaseDataDumpBuffer;
		let fileStorageBucketAndPathToId;
		const assortmentImagesDataDump = [];
		const qrCodesDataDump = [];
		const reportsDataDump = [];

		try {
			for await (const entry of zip) {
				const isDirectory = entry.filename.endsWith("/");

				if (isDirectory) continue;

				const segments = entry.filename.split("/");

				const stream = await entry.openReadStream();
				const buffer = await streamToBuffer(stream);

				if (segments[0] === this.databasePathPrefix) { databaseDataDumpBuffer = buffer }

				if (segments[0] === this.fileStoragePathPrefix) {
					const bucket = segments[1];
					const path = segments[2];

					if (bucket === this.fileStorageBucketAndPathToIdPath) {
						fileStorageBucketAndPathToId = JSON.parse(buffer.toString("utf8"));
						continue;
					}

					const base64 = Base64Mapper.fromBuffer(buffer);

					const data = {
						metadata: { bucket, storageType: FileStorageType.S3 },
						mimeType: getMimeTypeByPath(path) || "application/octet-stream",
						base64,
						path,
					};

					if (bucket === S3FileStorageBucket.ASSORTMENT_IMAGES) assortmentImagesDataDump.push(data);
					if (bucket === S3FileStorageBucket.QR_CODES) qrCodesDataDump.push(data);
					if (bucket === S3FileStorageBucket.REPORTS) reportsDataDump.push(data);
				}
			}
		} finally {
			await zip.close();
		}

		if (!databaseDataDumpBuffer) throw new InvalidBackupError();

		return {
			database: { exportBuffer: databaseDataDumpBuffer },
			fileStorageDump: {
				assortments: {
					images: assortmentImagesDataDump,
					qrCodes: qrCodesDataDump,
				},
				reports: reportsDataDump,
				context: { bucketAndPathToId: fileStorageBucketAndPathToId }
			},
		};
	}

	async take(): Promise<Backup> {
		const fileStorageDataDump = await this.fileStorageDataManager.dump();
		const databaseDataDump = await this.databaseDataManager.dump();

		const backupFile = new ZipFileWritable();

		const assortmentImagesPath = `${this.fileStoragePathPrefix}/${S3FileStorageBucket.ASSORTMENT_IMAGES}`;
		const qrCodesPath = `${this.fileStoragePathPrefix}/${S3FileStorageBucket.QR_CODES}`;
		const reportsPath = `${this.fileStoragePathPrefix}/${S3FileStorageBucket.REPORTS}`;

		backupFile.addEmptyDirectory(`${this.fileStoragePathPrefix}/`);
		backupFile.addEmptyDirectory(`${assortmentImagesPath}/`);
		backupFile.addEmptyDirectory(`${qrCodesPath}/`);
		backupFile.addEmptyDirectory(`${reportsPath}/`);

		backupFile.addEmptyDirectory(`${this.databasePathPrefix}/`);

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

		backupFile.addBuffer(
			Buffer.from(JSON.stringify(fileStorageDataDump.context.bucketAndPathToId)),
			`${this.fileStoragePathPrefix}/${this.fileStorageBucketAndPathToIdPath}`,
		);

		backupFile.addBuffer(databaseDataDump.exportBuffer, `${this.databasePathPrefix}/backup.dump`);

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
		const { base64: backupBase64 } = await this.fetchBackupFile.execute(
			{
				id: backup.file.id.value,
				metadata: { bucket: S3FileStorageBucket.BACKUPS },
			},
			{ skipAuthentication: true }
		);
		const backupBuffer = Base64Mapper.toBuffer(Base64.fromString(backupBase64));

		const zip = await openZIPByBuffer(backupBuffer);
		const backupData = await this.handleReadableZipFile(zip);

		await this.databaseDataManager.restore(backupData.database);
		await this.fileStorageDataManager.restore(backupData.fileStorageDump);
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
