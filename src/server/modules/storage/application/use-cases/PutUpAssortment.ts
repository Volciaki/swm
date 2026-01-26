import { UserDTO, UnauthorizedError } from "@/server/utils";
import { PutUpAssortmentDTO } from "../dto/PutUpAssortmentDTO";
import { StorageAssortmentHelper } from "../helpers/StorageAssortmentHelper";

export class PutUpAssortment {
	constructor(private readonly storageHelper: StorageAssortmentHelper) {}

	async execute(dto: PutUpAssortmentDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		return await this.storageHelper.putUpAssortmentByDTO(dto, currentUser);
	}
}
