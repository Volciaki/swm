import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import {
	isFileEncryptedByBucket,
	S3FileStorageBucket,
} from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import type { GetAllReports } from "@/server/modules/reporting/application/use-cases/GetAllReports";
import type { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import type { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import type { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import type { DeleteFile } from "@/server/utils/files/application/use-cases/DeleteFile";
import { Base64, UUID } from "@/server/utils";
import type {
	AccessedFileDataDump,
	AccessedFileStorageDataDump,
	FileStorageDataDumpContext,
	FileStorageDataManager,
} from "../../application/services/FileStorageDataManager";

export class DefaultFileStorageDataManager implements FileStorageDataManager {
	constructor(
		private readonly getAllAssortment: GetAllAssortment,
		private readonly getAllReports: GetAllReports,
		private readonly getFile: GetFile,
		private readonly fetchAssortmentImageFile: FetchFile,
		private readonly fetchAssortmentQRCodeFile: FetchFile,
		private readonly fetchReportFile: FetchFile,
		private readonly uploadAssortmentImageFile: UploadFile,
		private readonly uploadAssortmentQRCodeFile: UploadFile,
		private readonly uploadReportFile: UploadFile,
		private readonly deleteAssortmentImageFile: DeleteFile,
		private readonly deleteAssortmentQRCodeFile: DeleteFile,
		private readonly deleteReportFile: DeleteFile
	) {}

	private async getFilesDumpData<T>(
		entities: T[],
		getFileIdByEntity: (entity: T) => string | null,
		bucket: S3FileStorageBucket,
		fileFetcher: FetchFile
	) {
		const entitiesData = await Promise.all(
			entities.map(async (entity) => {
				const fileId = getFileIdByEntity(entity);

				if (fileId === null) return null;

				const file = await this.getFile.execute({ id: fileId });
				const data = await fileFetcher.execute(
					{
						id: fileId,
						metadata: { bucket },
					},
					{ skipAuthentication: true }
				);
				return {
					...file,
					base64: Base64.fromString(data.base64),
				};
			})
		);
		return entitiesData.filter((data) => data !== null);
	}

	private async deleteFiles<T>(
		entities: T[],
		getFileIdByEntity: (entity: T) => string | null,
		deleteExecutor: DeleteFile
	) {
		for (const entity of entities) {
			const fileId = getFileIdByEntity(entity);

			if (fileId === null) continue;

			await deleteExecutor.execute({ id: fileId }, { skipAuthentication: true });
		}
	}

	private async uploadFiles<T extends AccessedFileDataDump>(
		entities: T[],
		uploadExecutor: UploadFile,
		context: FileStorageDataDumpContext
	) {
		for (const entity of entities) {
			const { metadata, mimeType, path } = entity;

			const id = context.bucketAndPathToId[`${entity.metadata.bucket}/${path}`];

			await uploadExecutor.execute(
				{
					contentBase64: entity.base64.value,
					isEncrypted: isFileEncryptedByBucket(entity.metadata.bucket as S3FileStorageBucket),
					metadata,
					mimeType,
					path,
				},
				{
					skipAuthentication: true,
					predefinedId: UUID.fromString(id),
				}
			);
		}
	}

	async dump() {
		const assortments = await this.getAllAssortment.execute();
		const reports = await this.getAllReports.execute();

		const assortmentImageData = await this.getFilesDumpData<(typeof assortments)[number]>(
			assortments,
			(entity) => entity.definition.image?.id ?? null,
			S3FileStorageBucket.ASSORTMENT_IMAGES,
			this.fetchAssortmentImageFile
		);
		const assortmentQRCodeData = await this.getFilesDumpData<(typeof assortments)[number]>(
			assortments,
			(entity) => entity.definition.qrCode.id,
			S3FileStorageBucket.QR_CODES,
			this.fetchAssortmentQRCodeFile
		);
		const reportsFileData = await this.getFilesDumpData<(typeof reports)[number]>(
			reports,
			(entity) => entity.file.id,
			S3FileStorageBucket.REPORTS,
			this.fetchReportFile
		);

		const bucketAndPathToId: Record<string, string> = {};

		for (const data of assortmentImageData) {
			bucketAndPathToId[`${data.metadata.bucket}/${data.path}`] = data.id;
		}
		for (const data of assortmentQRCodeData) {
			bucketAndPathToId[`${data.metadata.bucket}/${data.path}`] = data.id;
		}
		for (const data of reportsFileData) {
			bucketAndPathToId[`${data.metadata.bucket}/${data.path}`] = data.id;
		}

		return {
			reports: reportsFileData,
			assortments: {
				images: assortmentImageData,
				qrCodes: assortmentQRCodeData,
			},
			context: { bucketAndPathToId },
		};
	}

	async restore(dump: AccessedFileStorageDataDump) {
		const assortments = await this.getAllAssortment.execute();
		const reports = await this.getAllReports.execute();

		await this.deleteFiles(
			assortments,
			(entity) => entity.definition.image?.id ?? null,
			this.deleteAssortmentImageFile
		);
		await this.deleteFiles(assortments, (entity) => entity.definition.qrCode.id, this.deleteAssortmentQRCodeFile);
		await this.deleteFiles(reports, (entity) => entity.file.id, this.deleteReportFile);

		await this.uploadFiles(dump.assortments.images, this.uploadAssortmentImageFile, dump.context);
		await this.uploadFiles(dump.assortments.qrCodes, this.uploadAssortmentQRCodeFile, dump.context);
		await this.uploadFiles(dump.reports, this.uploadReportFile, dump.context);
	}
}
