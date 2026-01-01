import { CelsiusDegrees } from "../entity";
import { TemperatureRangeDTO } from "./dto";
import { TemperatureRange } from "./type";

export class TemperatureRangeMapper {
    static fromDTO(dto: TemperatureRangeDTO): TemperatureRange {
        const { maximalCelsius, minimalCelsius } = dto;
        return {
            maximal: CelsiusDegrees.fromNumber(maximalCelsius),
            minimal: CelsiusDegrees.fromNumber(minimalCelsius),
        };
    }
}
