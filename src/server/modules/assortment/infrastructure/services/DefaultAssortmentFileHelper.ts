import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import { UUID } from "@/server/utils";
import { AssortmentFileHelper } from "../../application/services/AssortmentFileHelper";

export class DefaultAssortmentFileHelper implements AssortmentFileHelper {
	constructor(private readonly getFile: GetFile) {
		// Required so that instances of this class can pass theirs `fileGetter`
		// // method around, without losing access to provided `getFile` action.
		this.fileGetter = this.fileGetter.bind(this);
	}

	async fileGetter(id: UUID) {
		const fileDTO = await this.getFile.execute({ id: id.value });
		return FileReferenceMapper.fromDTOToEntity(fileDTO);
	}
}
