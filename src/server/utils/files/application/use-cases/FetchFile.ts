import { UserDTO, UnauthorizedError } from "@/server/utils/identity";
import { Base64Mapper } from "@/server/utils/base64";
import { FileHelper } from "../helpers/FileHelper";
import { FileManager } from "../../domain/services/FileManager";
import { FetchFileResponseDTO } from "../dto/FetchFileResponseDTO";
import { FetchFileDTO } from "../dto/FetchFileDTO";
import { logger } from "@/server/logger";

export class FetchFile {
	constructor(
		private readonly fileHelper: FileHelper,
		private readonly fileManager: FileManager,
	) { }

	async execute(dto: FetchFileDTO, currentUser?: UserDTO): Promise<FetchFileResponseDTO> {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		logger.warn(`fetching ${dto.id}!!!`);

		const file = await this.fileHelper.getByIdStringOrThrow(dto.id);
		const buffer = await this.fileManager.fetchFile(file);
		return { base64: Base64Mapper.fromBuffer(buffer).value };
	}
}
