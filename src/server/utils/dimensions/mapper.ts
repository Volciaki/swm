import { Distance } from "../distance";
import { DimensionsDTO } from "./dto";
import { Dimensions } from "./entity";

export class DimensionsMapper {
    static fromDTO(dto: DimensionsDTO): Dimensions {
        const { widthMillimeters, heightMillimeters, lengthMillimeters } = dto;
        return Dimensions.create(
            Distance.fromMillimeters(widthMillimeters),
            Distance.fromMillimeters(heightMillimeters),
            Distance.fromMillimeters(lengthMillimeters),
        );
    }
}
