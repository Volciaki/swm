import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { TakeDownAssortmentDTO } from "../dto/TakeDownAssortmentDTO";
import type { StorageAssortmentHelper } from "../helpers/StorageAssortmentHelper";

export class TakeDownAssortment {
	constructor(private readonly storageHelper: StorageAssortmentHelper) {}

	async execute(dto: TakeDownAssortmentDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		return await this.storageHelper.takeDownAssortment(dto);
	}
}
