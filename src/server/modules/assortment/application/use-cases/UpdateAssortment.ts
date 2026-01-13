import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import { UnauthorizedError } from "@/server/utils";
import { UserDTO } from "@/server/utils";
import { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import { UpdateAssortmentDTO } from "../dto/UpdateAssortmentDTO";
import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";
import { AssortmentHelper } from "../helpers/AssortmentHelper";
import { AssortmentFileHelper } from "../services/AssortmentFileHelper";

export class UpdateAssortment {
	constructor(
		private readonly assortmentRepository: AssortmentRepository,
		private readonly assortmentHelper: AssortmentHelper,
		private readonly assortmentFileHelper: AssortmentFileHelper,
	) { }

	async execute(dto: UpdateAssortmentDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const assortment = await this.assortmentHelper.getByIdStringOrThrow(dto.id, this.assortmentFileHelper.fileGetter);
		const newAssortment = AssortmentMapper.fromAssortmentDTOToAssortment(
			{
				...dto.newData,
				id: dto.id,
				cellId: assortment.cellId.value,
				shelfId: assortment.shelfId.value,
				storedAtTimestamp: assortment.storedAt.getTime(),
				qrCode: FileReferenceMapper.fromEntityToDTO(assortment.qrCode),
			},
		);

		const { weight, size, expiresAfter, isHazardous, name, temperatureRange, comment, image } = newAssortment;
		assortment.weight = weight;
		assortment.size = size;
		assortment.expiresAfter = expiresAfter;
		assortment.isHazardous = isHazardous;
		assortment.name = name;
		assortment.temperatureRange = temperatureRange;
		assortment.comment = comment;
		assortment.image = image;
		await this.assortmentRepository.update(assortment);

		return AssortmentMapper.fromAssortmentToAssortmentDTO(assortment);
	}
}
