import type { VisibilityDTO } from "../../application/dto/shared/VisbilityDTO";
import { Visibility } from "../../domain/entities/Visibility";

export class VisibilityMapper {
	static fromDTO(dto: VisibilityDTO): Visibility {
		return Visibility.create(dto.isPublic, dto.publicUrl ?? undefined);
	}

	static toDTO(entity: Visibility): VisibilityDTO {
		return {
			publicUrl: entity.publicUrl ?? null,
			isPublic: entity.isPublic,
		};
	}
}
