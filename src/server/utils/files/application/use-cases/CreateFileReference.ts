import type { UUID } from "@/server/utils";
import type { UserDTO } from "@/server/utils/identity";
import { UnauthorizedError } from "@/server/utils/identity";
import type { FileManager } from "../../domain/services/FileManager";
import type { CreateFileReferenceDTO } from "../dto/CreateFileReferenceDTO";

export type CreateFileReferenceOptions = {
	skipAuthentication?: boolean;
	predefinedId?: UUID;
};

export class CreateFileReference {
	constructor(private readonly fileManager: FileManager) {}

	async execute(dto: CreateFileReferenceDTO, optionsUnsafe?: CreateFileReferenceOptions, currentUser?: UserDTO) {
		const options: CreateFileReferenceOptions = {
			skipAuthentication: false,
			predefinedId: undefined,
			...optionsUnsafe,
		};

		if (!currentUser?.isAdmin && !options.skipAuthentication) throw new UnauthorizedError();

		return await this.fileManager.createReference({ ...dto, predefinedId: options.predefinedId });
	}
}
