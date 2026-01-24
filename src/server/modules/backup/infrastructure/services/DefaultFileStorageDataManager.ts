/* eslint-disable indent */

import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { S3FileStorageBucket } from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import { GetAllReports } from "@/server/modules/reporting/application/use-cases/GetAllReports";
import { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import { Base64 } from "@/server/utils";
import { FileStorageDataManager } from "../../application/services/FileStorageDataManager";

export class DefaultFileStorageDataManager implements FileStorageDataManager {
	constructor(
		private readonly getAllAssortment: GetAllAssortment,
		private readonly getAllReports: GetAllReports,
		private readonly getFile: GetFile,
		private readonly fetchAssortmentImageFile: FetchFile,
		private readonly fetchAssortmentQRCodeFile: FetchFile,
		private readonly fetchReportFile: FetchFile,
	) { }

	private async getFilesDumpData<T>(
		entities: T[],
		getFileIdByEntity: (entity: T) => string | null,
		bucket: S3FileStorageBucket,
		fileFetcher: FetchFile,
	) {
		const entitiesData = await Promise.all(
			entities.map(async (entity) => {
				const fileId = getFileIdByEntity(entity);

				if (fileId === null) return null;

				const file = await this.getFile.execute({ id: fileId })
				const data = await fileFetcher.execute(
					{
						id: fileId,
						metadata: { bucket },
					},
					{ skipAuthentication: true },
				);
				return {
					...file,
					base64: Base64.fromString(data.base64),
				};
			}),
		);
		return entitiesData.filter((data) => data !== null);
	}

	async dump() {
		const assortments = await this.getAllAssortment.execute();
		const reports = await this.getAllReports.execute();

		const assortmentImageData = await this.getFilesDumpData<(typeof assortments)[number]>(
			assortments,
			(entity) => entity.image?.id ?? null,
			S3FileStorageBucket.ASSORTMENT_IMAGES,
			this.fetchAssortmentImageFile,
		);
		const assortmentQRCodeData = await this.getFilesDumpData<(typeof assortments)[number]>(
			assortments,
			(entity) => entity.qrCode.id,
			S3FileStorageBucket.QR_CODES,
			this.fetchAssortmentQRCodeFile,
		);

		const reportsFileData = await this.getFilesDumpData<(typeof reports)[number]>(
			reports,
			(entity) => entity.file.id,
			S3FileStorageBucket.REPORTS,
			this.fetchReportFile,
		);

		return {
			reports: reportsFileData,
			assortments: {
				images: assortmentImageData,
				qrCodes: assortmentQRCodeData,
			},
		};
	}
}
