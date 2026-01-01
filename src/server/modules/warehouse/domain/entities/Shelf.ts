import { UUID, CelsiusDegrees, Weight, Dimensions, Distance } from "@/server/utils";
import { ShelfFullError } from "../errors/ShelfFullError";
import { AssortmentTooWideError } from "../errors/AssortmentTooWideError";
import { AssortmentTooTallError } from "../errors/AssortmentTooTallError";
import { AssortmentTooLongError } from "../errors/AssortmentTooLongError";
import { ShelfTooColdForAssortmentError } from "../errors/ShelfTooColdForAssortmentError";
import { ShelfTooHotForAssortmentError } from "../errors/ShelfTooHotForAssortmentError";
import { type AssortmentDTO } from "../dto/AssortmentDTO";
import { Cell } from "./Cell";

type TemperatureRange = { minimal: CelsiusDegrees, maximal: CelsiusDegrees };

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

    get id() { return this._id };
    get cells() { return [...this._rows, ...this._columns] };
    get maxAssortmentSize() { return this._maxAssortmentSize };
    get temperatureRange() { return this._temperatureRange };

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
            id,
            name,
            comment,
            rows,
            columns,
            temperatureRange,
            maxWeight,
            maxAssortmentSize,
        );
    }

    public storeAssortment(assortment: AssortmentDTO) {
        const emptyCell = this.cells.find((cell) => cell.assortmentId === null);
        if (!emptyCell) throw new ShelfFullError(this.id);

        const { widthMillimeters, heightMillimeters, lengthMillimeters } = assortment.dimensions
        const assortmentWidth = Distance.fromMillimeters(widthMillimeters);
        const assortmentHeight = Distance.fromMillimeters(heightMillimeters);
        const assortmentLength = Distance.fromMillimeters(lengthMillimeters);
        // TODO: ???
        if (assortmentWidth > this.maxAssortmentSize.width)
            throw new AssortmentTooWideError(assortmentWidth, this.maxAssortmentSize.width);
        if (assortmentHeight > this.maxAssortmentSize.height)
            throw new AssortmentTooTallError(assortmentHeight, this.maxAssortmentSize.height);
        if (assortmentLength > this.maxAssortmentSize.length)
            throw new AssortmentTooLongError(assortmentLength, this.maxAssortmentSize.length);

        const { minimalCelsius, maximalCelsius } = assortment.temperatureRange;
        const assortmentMinimalTemperature = CelsiusDegrees.fromNumber(minimalCelsius);
        const assortmentMaximalTemperature = CelsiusDegrees.fromNumber(maximalCelsius);
        // TODO: ???
        if (assortmentMinimalTemperature > this.temperatureRange.maximal)
            throw new ShelfTooColdForAssortmentError(assortmentMinimalTemperature, this.temperatureRange.maximal);
        if (assortmentMaximalTemperature < this.temperatureRange.minimal)
            throw new ShelfTooHotForAssortmentError(assortmentMaximalTemperature, this.temperatureRange.minimal);

        // TODO: check if shelf has enough weight left to support this assortment.
        // const assortmentWeight = Weight.fromKilograms(assortment.weightKg);
        // TODO: check if shelf supports hazardous assortment.

        emptyCell.assortmentId = UUID.fromString(assortment.id);
    }
}
