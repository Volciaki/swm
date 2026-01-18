import { FileReferenceMapper } from "../../infrastructure/mappers/FileReferenceMapper";
import { FileHelper } from "../helpers/FileHelper";
import { GetFileDTO } from "../dto/GetFileDTO";

export class GetFile {
	constructor(private readonly fileHelper: FileHelper) { }

	async execute(dto: GetFileDTO) {
		const file = await this.fileHelper.getByIdStringOrThrow(dto.id);
		return FileReferenceMapper.fromEntityToDTO(file);
	}
}
