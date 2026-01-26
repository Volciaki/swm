import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { PutUpAssortmentDTO } from "../dto/PutUpAssortmentDTO";
import type { StorageAssortmentHelper } from "../helpers/StorageAssortmentHelper";

export class PutUpAssortment {
	constructor(private readonly storageHelper: StorageAssortmentHelper) {}

	async execute(dto: PutUpAssortmentDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		return await this.storageHelper.putUpAssortmentByDTO(dto, currentUser);
	}
}
