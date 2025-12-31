import { UUID, CelsiusDegrees, Weight, Dimensions } from "@/server/utils";
import { Cell } from "./Cell";

type TemperatureRange = { minimal: CelsiusDegrees, maximum: CelsiusDegrees };

export class Shelf {
    private constructor(
        private readonly _id: UUID,
        private readonly _name: string,
        private readonly _comment: string,
        private readonly _rows: Cell[],
        private readonly _columns: Cell[],
        private readonly _temperatureRange: TemperatureRange,
        private readonly _maxWeight: Weight,
        private readonly _maxAssortmentSize: Dimensions,
    ) {}

    static create(
        name: string,
        id: UUID,
        comment: string,
        rows: Cell[],
        columns: Cell[],
        temperatureRange: TemperatureRange,
        maxWeight: Weight,
        maxAssortmentSize: Dimensions,
    ) {
        return new Shelf(
            name,
            id,
            comment,
            rows,
            columns,
            temperatureRange,
            maxWeight,
            maxAssortmentSize,
        );
    }
}
