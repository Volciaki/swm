import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import { UUID } from "@/server/utils";
import { ReportRepository } from "../../domain/repositories/ReportRepository";
import { ReportMapper } from "../../infrastructure/mappers/ReportMapper";

export class GetAllReports {
	constructor(
		private readonly reportRepository: ReportRepository,
		private readonly getFile: GetFile,
	) {}

	async execute() {
		const reports = await this.reportRepository.getAll(
			async (uuid: UUID) => {
				const file = await this.getFile.execute({ id: uuid.value });
				return FileReferenceMapper.fromDTOToEntity(file);
			},
		);
		return reports.map((report) => ReportMapper.fromEntityToDTO(report));
	}
}
