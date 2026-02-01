import type { AssortmentDTO } from "../dto/shared/AssortmentDTO";
import type { AssortmentVO } from "../dto/shared/AssortmentVO";

export const assortmentDTOToAssortmentVO = (dto: AssortmentDTO): AssortmentVO => {
	return {
		...dto.definition,
		id: dto.id,
	};
};

export const assortmentsDTOToAssortmentsVO = (dtos: AssortmentDTO[]): AssortmentVO[] => {
	return dtos.map((dto) => assortmentDTOToAssortmentVO(dto));
};
