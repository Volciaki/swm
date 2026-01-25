import { UserDTO, UnauthorizedError } from "@/server/utils/identity";
import { Base64Mapper } from "@/server/utils/base64";
import { FileHelper } from "../helpers/FileHelper";
import { FileManager } from "../../domain/services/FileManager";
import { FetchFileResponseDTO } from "../dto/FetchFileResponseDTO";
import { FetchFileDTO } from "../dto/FetchFileDTO";

export type UpdateShelfOptions = {
	skipAuthentication: boolean;
};

export class FetchFile {
	constructor(
		private readonly fileHelper: FileHelper,
		private readonly fileManager: FileManager,
	) { }

	async execute(dto: FetchFileDTO, optionsUnsafe?: UpdateShelfOptions, currentUser?: UserDTO): Promise<FetchFileResponseDTO> {
		const options: UpdateShelfOptions = {
			skipAuthentication: false,
			...optionsUnsafe,
		};

		if (!currentUser?.isAdmin && !options.skipAuthentication) throw new UnauthorizedError();

		const file = await this.fileHelper.getByIdStringOrThrow(dto.id);
		const buffer = await this.fileManager.fetchFile(file);
		return { base64: Base64Mapper.fromBuffer(buffer).value };
	}
}
