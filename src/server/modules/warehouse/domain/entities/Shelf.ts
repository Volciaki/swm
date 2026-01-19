import { UUID, CelsiusDegrees, Weight, Dimensions, Distance, TemperatureRange } from "@/server/utils";
import { ShelfFullError } from "../errors/ShelfFullError";
import { AssortmentTooWideError } from "../errors/AssortmentTooWideError";
import { AssortmentTooTallError } from "../errors/AssortmentTooTallError";
import { AssortmentTooLongError } from "../errors/AssortmentTooLongError";
import { AssortmentIsHazardousError } from "../errors/AssortmentIsHazardousError";
import { ShelfTooColdForAssortmentError } from "../errors/ShelfTooColdForAssortmentError";
import { ShelfTooHotForAssortmentError } from "../errors/ShelfTooHotForAssortmentError";
import { ShelfOverloadedError } from "../errors/ShelfOverloadedError";
import { CellNotFoundError } from "../errors/CellNotFoundError";
import { ShelfUnevenError } from "../../application/errors/ShelfUnevenError";
import { AssortmentVO } from "../vo/AssortmentVO";
import { Cell } from "./Cell";

export class Shelf {
	private constructor(
		private _id: UUID,
		private _name: string,
		private _comment: string,
		private _cells: Cell[][],
		private _temperatureRange: TemperatureRange,
		private _maxWeight: Weight,
		private _maxAssortmentSize: Dimensions,
		private _supportsHazardous: boolean,
		private _lastRecordedLegalWeight: Weight,
	) { }

	get id() { return this._id };
	get maxAssortmentSize() { return this._maxAssortmentSize };
	get temperatureRange() { return this._temperatureRange };
	get maxWeight() { return this._maxWeight };
	get cells() { return this._cells };
	get comment() { return this._comment };
	get name() { return this._name };
	get supportsHazardous() { return this._supportsHazardous };
	get lastRecordedLegalWeight() { return this._lastRecordedLegalWeight };

	set name(value: string) { this._name = value };
	set comment(value: string) { this._comment = value };
	set cells(value: Cell[][]) { this._cells = value };
	set maxAssortmentSize(value: Dimensions) { this._maxAssortmentSize = value };
	set maxWeight(value: Weight) { this._maxWeight = value };
	set temperatureRange(value: TemperatureRange) { this._temperatureRange = value };
	set supportsHazardous(value: boolean) { this._supportsHazardous = value };
	private set lastRecordedLegalWeight(value: Weight) { this._lastRecordedLegalWeight = value };

	static create(
		id: UUID,
		name: string,
		comment: string,
		cells: Cell[][],
		temperatureRange: TemperatureRange,
		maxWeight: Weight,
		maxAssortmentSize: Dimensions,
		supportsHazardous: boolean,
		lastRecordedLegalWeight: Weight,
	) {
		const shelf = new Shelf(
			id,
			name,
			comment,
			cells,
			temperatureRange,
			maxWeight,
			maxAssortmentSize,
			supportsHazardous,
			lastRecordedLegalWeight,
		);

		shelf.validate();

		return shelf;
	}

	// All rows need to have the same length. 
	private validateCells() {
		const firstRowLength = this.cells[0].length;
		for (const cellRow of this.cells) {
			if (cellRow.length !== firstRowLength)
				throw new ShelfUnevenError();
		}
	}

	private validateWeight() {
		const totalWeight = this.getTotalWeight();
		if (totalWeight.kilograms > this.maxWeight.kilograms)
			throw new ShelfOverloadedError(this.id, this.maxWeight, totalWeight);
	}

	private validateAssortment(assortment: AssortmentVO) {
		const { widthMillimeters, heightMillimeters, lengthMillimeters } = assortment.size;

		const assortmentWidth = Distance.fromMillimeters(widthMillimeters);
		const assortmentHeight = Distance.fromMillimeters(heightMillimeters);
		const assortmentLength = Distance.fromMillimeters(lengthMillimeters);

		if (assortmentWidth.millimeters > this.maxAssortmentSize.width.millimeters)
			throw new AssortmentTooWideError(assortmentWidth, this.maxAssortmentSize.width);
		if (assortmentHeight.millimeters > this.maxAssortmentSize.height.millimeters)
			throw new AssortmentTooTallError(assortmentHeight, this.maxAssortmentSize.height);
		if (assortmentLength.millimeters > this.maxAssortmentSize.length.millimeters)
			throw new AssortmentTooLongError(assortmentLength, this.maxAssortmentSize.length);

		const { minimalCelsius, maximalCelsius } = assortment.temperatureRange;

		const assortmentMinimalTemperature = CelsiusDegrees.fromNumber(minimalCelsius);
		const assortmentMaximalTemperature = CelsiusDegrees.fromNumber(maximalCelsius);

		if (assortmentMinimalTemperature > this.temperatureRange.maximal)
			throw new ShelfTooColdForAssortmentError(assortmentMinimalTemperature, this.temperatureRange.maximal);
		if (assortmentMaximalTemperature < this.temperatureRange.minimal)
			throw new ShelfTooHotForAssortmentError(assortmentMaximalTemperature, this.temperatureRange.minimal);

		if (assortment.isHazardous && !this.supportsHazardous) throw new AssortmentIsHazardousError(this.id);
	}

	private validateAllAssortment() {
		const assortments = this.cells.flat().map((cell) => cell.assortment);
		for (const assortment of assortments) {
			if (assortment === null) continue;

			this.validateAssortment(assortment);
		}
	}

	public validate() {
		this.validateCells();
		this.validateAllAssortment();
		this.validateWeight();
	}

	private validateNewAssortment(assortment: AssortmentVO) {
		const emptyCell = this.cells.flat().find((cell) => cell.assortment === null);
		if (!emptyCell) throw new ShelfFullError(this.id);

		this.validateAssortment(assortment);
	}

	public setCellsAssortmentById(id: UUID, newAssortment: AssortmentVO | null) {
		if (newAssortment !== null) this.validateNewAssortment(newAssortment);

		for (const row of this.cells) {
			const cell = row.find((cell) => cell.id.value === id.value);
			if (cell) {
				cell.assortment = newAssortment;
				this.validate();
				return;
			}
		}

		throw new CellNotFoundError(id);
	}

	public getTotalWeight(): Weight {
		let totalWeightKg = 0;

		for (const cell of this.cells.flat()) {
			if (!cell.assortment) continue;
			totalWeightKg += cell.assortment.weightKg;
		}

		return Weight.fromKilograms(totalWeightKg);
	}

	public updateLastRecordedLegalWeight() {
		const currentWeight = this.getTotalWeight();
		this.lastRecordedLegalWeight = currentWeight;
	}

	/// This will return `true` if an unnoted change to this Shelf has been made.
	// To check this we compare the previously recorded weight of the Shelf to weight of all its current assortments.
	// If an assortment has, for example, been taken down without oficial approval of doing so, the weights will not
	// match, as the system didn't have the chance to update them.
	public hasBeenChangedIllegaly() {
		const lastRecordedWeight = this.lastRecordedLegalWeight;
		const currentWeight = this.getTotalWeight();

		return lastRecordedWeight !== currentWeight;
	}
}
