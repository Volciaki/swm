import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import { UUID } from "@/server/utils";
import { AssortmentFileHelper } from "../../application/services/AssortmentFileHelper";

export class DefaultAssortmentFileHelper implements AssortmentFileHelper {
	constructor(private readonly getFile: GetFile) { }

	async fileGetter(id: UUID) {
		const fileDTO = await this.getFile.execute({ id: id.value });
		return FileReferenceMapper.fromDTOToEntity(fileDTO);
	}
}
