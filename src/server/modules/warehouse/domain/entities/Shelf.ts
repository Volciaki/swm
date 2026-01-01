import { UUID, CelsiusDegrees, Weight, Dimensions, Distance, TemperatureRange } from "@/server/utils";
import { ShelfFullError } from "../errors/ShelfFullError";
import { AssortmentTooWideError } from "../errors/AssortmentTooWideError";
import { AssortmentTooTallError } from "../errors/AssortmentTooTallError";
import { AssortmentTooLongError } from "../errors/AssortmentTooLongError";
import { ShelfTooColdForAssortmentError } from "../errors/ShelfTooColdForAssortmentError";
import { ShelfTooHotForAssortmentError } from "../errors/ShelfTooHotForAssortmentError";
import { type AssortmentDTO } from "../dto/AssortmentDTO";
import { Cell } from "./Cell";

export class Shelf {
    private constructor(
        private _id: UUID,
        private _name: string,
        private _comment: string,
        private _rows: Cell[],
        private _columns: Cell[],
        private _temperatureRange: TemperatureRange,
        private _maxWeight: Weight,
        private _maxAssortmentSize: Dimensions,
    ) {}

    get id() { return this._id };
    get maxAssortmentSize() { return this._maxAssortmentSize };
    get temperatureRange() { return this._temperatureRange };
    get maxWeight() { return this._maxWeight };
    get columns() { return this._columns };
    get rows() { return this._rows };
    get comment() { return this._comment };
    get name() { return this._name };
    get cells() { return [...this.rows, ...this.columns] };

    set name(value: string) { this._name = value };
    set comment(value: string) { this._comment = value };
    set columns(value: Cell[]) { this._columns = value };
    set rows(value: Cell[]) { this._rows = value };
    set maxAssortmentSize(value: Dimensions) { this._maxAssortmentSize = value };
    set maxWeight(value: Weight) { this._maxWeight = value };
    set temperatureRange(value: TemperatureRange) { this._temperatureRange = value };

    static create(
        id: UUID,
        name: string,
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
