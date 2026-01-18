import { UUID } from "@/server/utils";
import { FileReference } from "@/server/utils/files/domain/entities/FileReference";

export interface AssortmentFileHelper {
	fileGetter(id: UUID): Promise<FileReference>;
}
