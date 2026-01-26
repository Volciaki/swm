import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import {
	isFileEncryptedByBucket,
	S3FileStorageBucket,
} from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import type { UploadFile } from "@/server/utils/files/application/use-cases/UploadFile";
import type { DeleteFile } from "@/server/utils/files/application/use-cases/DeleteFile";
import type { UUIDManager } from "@/server/utils";
import type { ReportRepository } from "../../domain/repositories/ReportRepository";
import { Report } from "../../domain/entities/Report";
import type { GeneratedReport } from "../../domain/services/ReportGenerator";

export interface ReportHelper {
	createFromGenerated(generatedReport: GeneratedReport): Promise<Report>;
	delete(report: Report): Promise<void>;
}

export class DefaultReportHelper implements ReportHelper {
	constructor(
		private readonly uuidManager: UUIDManager,
		private readonly reportRepository: ReportRepository,
		private readonly uploadReportFile: UploadFile,
		private readonly deleteReportFile: DeleteFile
	) {}

	async createFromGenerated(generatedReport: GeneratedReport) {
		const reportId = this.uuidManager.generate();

		const reportFileDTO = await this.uploadReportFile.execute(
			{
				path: `${reportId.value}.pdf`,
				mimeType: "application/pdf",
				metadata: { bucket: S3FileStorageBucket.REPORTS },
				contentBase64: generatedReport.content.value,
				isEncrypted: isFileEncryptedByBucket(S3FileStorageBucket.REPORTS),
			},
			{ skipAuthentication: true }
		);

		const reportFile = FileReferenceMapper.fromDTOToEntity(reportFileDTO);
		const report = Report.create(reportId, generatedReport.metadata.type, new Date(), reportFile);
		await this.reportRepository.create(report);

		return report;
	}

	async delete(report: Report) {
		await this.deleteReportFile.execute({ id: report.file.id.value }, { skipAuthentication: true });
		await this.reportRepository.delete(report);
	}
}
