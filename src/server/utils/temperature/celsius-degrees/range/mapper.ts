import { CelsiusDegrees } from "../entity";
import { TemperatureRangeDTO } from "./dto";
import { TemperatureRange } from "./entity";

export class TemperatureRangeMapper {
    static fromDTO(dto: TemperatureRangeDTO): TemperatureRange {
        const { maximalCelsius, minimalCelsius } = dto;
        return TemperatureRange.create({
            maximal: CelsiusDegrees.fromNumber(maximalCelsius),
            minimal: CelsiusDegrees.fromNumber(minimalCelsius),
        });
    }

    static toDTO(range: TemperatureRange): TemperatureRangeDTO {
        return {
            maximalCelsius: range.maximal.value,
            minimalCelsius: range.minimal.value,
        };
    }
}
