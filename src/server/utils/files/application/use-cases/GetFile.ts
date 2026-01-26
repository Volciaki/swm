import { FileReferenceMapper } from "../../infrastructure/mappers/FileReferenceMapper";
import type { FileHelper } from "../helpers/FileHelper";
import type { GetFileDTO } from "../dto/GetFileDTO";

export class GetFile {
	constructor(private readonly fileHelper: FileHelper) {}

	async execute(dto: GetFileDTO) {
		const file = await this.fileHelper.getByIdStringOrThrow(dto.id);
		return FileReferenceMapper.fromEntityToDTO(file);
	}
}
