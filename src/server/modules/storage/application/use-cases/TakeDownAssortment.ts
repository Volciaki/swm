import { UnauthorizedError } from "@/server/utils/unauthorized/error";
import { UserDTO } from "@/server/utils";
import { TakeDownAssortmentDTO } from "../dto/TakeDownAssortmentDTO";
import { StorageAssortmentHelper } from "../helpers/StorageAssortmentHelper";

export class TakeDownAssortment {
	constructor(private readonly storageHelper: StorageAssortmentHelper) {}

	async execute(dto: TakeDownAssortmentDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		return await this.storageHelper.takeDownAssortmentByDTO(dto, currentUser);
	}
}
