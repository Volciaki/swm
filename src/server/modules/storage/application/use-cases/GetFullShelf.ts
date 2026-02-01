import type { GetFullShelfDTO } from "../dto/GetFullShelfDTO";
import { type GetFullShelfResponseDTO } from "../dto/GetFullShelfResponseDTO";
import type { StorageShelfHelper } from "../helpers/StorageShelfHelper";

export class GetFullShelf {
	constructor(private readonly storageShelfHelper: StorageShelfHelper) {}

	async execute(dto: GetFullShelfDTO): Promise<GetFullShelfResponseDTO> {
		return await this.storageShelfHelper.getByIdStringOrThrow(dto.id);
	}
}
