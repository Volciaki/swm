import { type AssortmentDTO } from "@/server/modules/assortment/application/dto/shared/AssortmentDTO";
import { type AssortmentVO as AssortmentVOReporting } from "@/server/modules/reporting/domain/vo/AssortmentVO";
import { type AssortmentVO as AssortmentVOWarehouse } from "@/server/modules/warehouse/domain/vo/AssortmentVO";

type AssortmentVO = AssortmentVOReporting & AssortmentVOWarehouse & { shelfId: string; cellId: string };

// Covnerts a full `AssortmentDTO` into a `VO` accepted by the other modules.
export const assortmentDTOToAssortmentVO = (dto: AssortmentDTO): AssortmentVO => {
	return {
		...dto.definition,
		...dto,
		id: dto.id,
	};
};

export const assortmentDTOsToAssortmentVOs = (dtos: AssortmentDTO[]): AssortmentVO[] => {
	return dtos.map((dto) => assortmentDTOToAssortmentVO(dto));
};
