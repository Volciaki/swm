import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import { S3FileStorageBucket } from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import type { FetchFileResponseDTO } from "@/server/utils/files/application/dto/FetchFileResponseDTO";
import type { FetchReportFileByReferenceIdDTO } from "../dto/FetchReportFileByReferenceIdDTO";

export class FetchReportFileByReferenceId {
	constructor(private readonly fetchReportFile: FetchFile) {}

	async execute(dto: FetchReportFileByReferenceIdDTO, currentUser?: UserDTO): Promise<FetchFileResponseDTO> {
		if (!currentUser) throw new UnauthorizedError();

		const file = await this.fetchReportFile.execute(
			{
				id: dto.fileReferenceId,
				metadata: { bucket: S3FileStorageBucket.REPORTS },
			},
			undefined,
			currentUser
		);
		return file;
	}
}
