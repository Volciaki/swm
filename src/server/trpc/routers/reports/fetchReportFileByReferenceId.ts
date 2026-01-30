import type { FetchFileResponseDTO } from "@/server/utils/files/application/dto/FetchFileResponseDTO";
import { fetchReportFileByReferenceIdDTOSchema } from "@/server/modules/reporting/application/dto/FetchReportFileByReferenceIdDTO";
import { FetchReportFileByReferenceId } from "@/server/modules/reporting/application/use-cases/FetchReportFileByReferenceId";
import { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import { S3FileStorageBucket } from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import { procedure } from "../../init";
import { getPresets, getServices } from "../../services";

export const fetchReportFileByReferenceId = procedure
	.input(fetchReportFileByReferenceIdDTOSchema)
	.query<FetchFileResponseDTO>(async ({ input, ctx }) => {
		const services = getServices(ctx);
		const presets = getPresets(services);

		const fileHelper = presets.fileHelper.default;
		const fileManager = presets.fileManager.default.get(S3FileStorageBucket.REPORTS);

		const fetchFile = new FetchFile(fileHelper, fileManager);

		const action = new FetchReportFileByReferenceId(fetchFile);
		return await action.execute(input, ctx.user ?? undefined);
	});
