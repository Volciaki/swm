import { UUID, CelsiusDegrees, Weight, Dimensions, Distance, TemperatureRange } from "@/server/utils";
import { ShelfFullError } from "../errors/ShelfFullError";
import { AssortmentTooWideError } from "../errors/AssortmentTooWideError";
import { AssortmentTooTallError } from "../errors/AssortmentTooTallError";
import { AssortmentTooLongError } from "../errors/AssortmentTooLongError";
import { ShelfTooColdForAssortmentError } from "../errors/ShelfTooColdForAssortmentError";
import { ShelfTooHotForAssortmentError } from "../errors/ShelfTooHotForAssortmentError";
import { ShelfOverloadedError } from "../errors/ShelfOverloadedError";
import { AssortmentVO } from "../vo/AssortmentDTO";
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

    public getCells(): Cell[] {
        return [...this.rows, ...this.columns];
    }

    public getTotalWeigth(): Weight {
        const cells = this.getCells();
        let totalWeightKg = 0;

        for (const cell of cells) {
            if (!cell.assortment) continue;
            totalWeightKg += cell.assortment.weightKg;
        }

        return Weight.fromKilograms(totalWeightKg);
    }

    public storeAssortment(assortment: AssortmentVO) {
        const emptyCell = this.getCells().find((cell) => cell.assortment === null);
        if (!emptyCell) throw new ShelfFullError(this.id);

        const { widthMillimeters, heightMillimeters, lengthMillimeters } = assortment.dimensions
        const assortmentWidth = Distance.fromMillimeters(widthMillimeters);
        const assortmentHeight = Distance.fromMillimeters(heightMillimeters);
        const assortmentLength = Distance.fromMillimeters(lengthMillimeters);
        if (assortmentWidth > this.maxAssortmentSize.width)
            throw new AssortmentTooWideError(assortmentWidth, this.maxAssortmentSize.width);
        if (assortmentHeight > this.maxAssortmentSize.height)
            throw new AssortmentTooTallError(assortmentHeight, this.maxAssortmentSize.height);
        if (assortmentLength > this.maxAssortmentSize.length)
            throw new AssortmentTooLongError(assortmentLength, this.maxAssortmentSize.length);

        const { minimalCelsius, maximalCelsius } = assortment.temperatureRange;
        const assortmentMinimalTemperature = CelsiusDegrees.fromNumber(minimalCelsius);
        const assortmentMaximalTemperature = CelsiusDegrees.fromNumber(maximalCelsius);
        if (assortmentMinimalTemperature > this.temperatureRange.maximal)
            throw new ShelfTooColdForAssortmentError(assortmentMinimalTemperature, this.temperatureRange.maximal);
        if (assortmentMaximalTemperature < this.temperatureRange.minimal)
            throw new ShelfTooHotForAssortmentError(assortmentMaximalTemperature, this.temperatureRange.minimal);

        const totalWeight = this.getTotalWeigth();
        const assortmentWeight = Weight.fromKilograms(assortment.weightKg);
        const newTotalWeightKg = totalWeight.kilograms + assortmentWeight.kilograms;
        if (newTotalWeightKg > this.maxWeight.kilograms)
            throw new ShelfOverloadedError(this.id, this.maxWeight, Weight.fromKilograms(newTotalWeightKg));

        // TODO: check if shelf supports hazardous assortment.

        emptyCell.assortment = assortment;
    }
}
