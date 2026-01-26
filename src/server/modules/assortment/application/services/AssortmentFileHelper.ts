import type { UUID } from "@/server/utils";
import type { FileReference } from "@/server/utils/files/domain/entities/FileReference";

export interface AssortmentFileHelper {
	fileGetter(id: UUID): Promise<FileReference>;
}
