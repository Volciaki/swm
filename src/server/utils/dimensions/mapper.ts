import { Distance } from "../distance";
import type { DimensionsDTO } from "./dto";
import { Dimensions } from "./entity";

export class DimensionsMapper {
	static fromDTO(dto: DimensionsDTO): Dimensions {
		const { widthMillimeters, heightMillimeters, lengthMillimeters } = dto;
		return Dimensions.create(
			Distance.fromMillimeters(widthMillimeters),
			Distance.fromMillimeters(heightMillimeters),
			Distance.fromMillimeters(lengthMillimeters)
		);
	}

	static toDTO(dimensions: Dimensions): DimensionsDTO {
		return {
			heightMillimeters: dimensions.height.millimeters.value,
			widthMillimeters: dimensions.width.millimeters.value,
			lengthMillimeters: dimensions.length.millimeters.value,
		};
	}
}
