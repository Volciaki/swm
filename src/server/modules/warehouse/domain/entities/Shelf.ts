import type { UUID, Dimensions, TemperatureRange } from "@/server/utils";
import { CelsiusDegrees, Weight, Distance } from "@/server/utils";
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
import type { AssortmentVO } from "../vo/AssortmentVO";
import type { Cell } from "./Cell";
import type { TemperatureReading } from "./TemperatureReading";
import type { WeightReading } from "./WeightReading";

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
		private _temperatureReadingIds: UUID[],
		private _currentTemperature: CelsiusDegrees,
		private _hasBeenChangedIllegally: boolean,
		private _weightReadingIds: UUID[],
		private _currentWeight: Weight
	) {}

	get id() {
		return this._id;
	}
	get maxAssortmentSize() {
		return this._maxAssortmentSize;
	}
	get temperatureRange() {
		return this._temperatureRange;
	}
	get maxWeight() {
		return this._maxWeight;
	}
	get cells() {
		return this._cells;
	}
	get comment() {
		return this._comment;
	}
	get name() {
		return this._name;
	}
	get supportsHazardous() {
		return this._supportsHazardous;
	}
	get lastRecordedLegalWeight() {
		return this._lastRecordedLegalWeight;
	}
	get temperatureReadingIds() {
		return this._temperatureReadingIds;
	}
	get currentTemperature() {
		return this._currentTemperature;
	}
	get hasBeenChangedIllegally() {
		return this._hasBeenChangedIllegally;
	}
	get weightReadingIds() {
		return this._weightReadingIds;
	}
	get currentWeight() {
		return this._currentWeight;
	}

	set name(value: string) {
		this._name = value;
	}
	set comment(value: string) {
		this._comment = value;
	}
	set cells(value: Cell[][]) {
		this._cells = value;
	}
	set maxAssortmentSize(value: Dimensions) {
		this._maxAssortmentSize = value;
	}
	set maxWeight(value: Weight) {
		this._maxWeight = value;
	}
	set temperatureRange(value: TemperatureRange) {
		this._temperatureRange = value;
	}
	set supportsHazardous(value: boolean) {
		this._supportsHazardous = value;
	}
	set currentTemperature(value: CelsiusDegrees) {
		this._currentTemperature = value;
	}
	set hasBeenChangedIllegally(value: boolean) {
		this._hasBeenChangedIllegally = value;
	}
	set currentWeight(value: Weight) {
		this._currentWeight = value;
	}
	private set lastRecordedLegalWeight(value: Weight) {
		this._lastRecordedLegalWeight = value;
	}

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
		temperatureReadingIds: UUID[],
		currentTemperature: CelsiusDegrees,
		weightReadingIds: UUID[],
		currentWeight: Weight
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
			temperatureReadingIds,
			currentTemperature,
			false,
			weightReadingIds,
			currentWeight
		);

		shelf.validate();
		shelf.updateHasBeenChangedIllegally();

		return shelf;
	}

	// All rows need to have the same length.
	private validateCells() {
		const firstRowLength = this.cells[0].length;
		for (const cellRow of this.cells) {
			if (cellRow.length !== firstRowLength) throw new ShelfUnevenError();
		}
	}

	private validateWeight() {
		const totalWeight = this.getTotalWeight();
		if (totalWeight.kilograms > this.maxWeight.kilograms)
			throw new ShelfOverloadedError({
				id: this.id.value,
				maxWeightKg: this.maxWeight.toStringKilograms(),
				attemptedWeightKg: totalWeight.toStringKilograms(),
			});
	}

	private validateAssortment(assortment: AssortmentVO) {
		const { widthMillimeters, heightMillimeters, lengthMillimeters } = assortment.size;

		const assortmentWidth = Distance.fromMillimeters(widthMillimeters);
		const assortmentHeight = Distance.fromMillimeters(heightMillimeters);
		const assortmentLength = Distance.fromMillimeters(lengthMillimeters);

		if (assortmentWidth.millimeters > this.maxAssortmentSize.width.millimeters)
			throw new AssortmentTooWideError({
				passedWidthMillimeters: assortmentWidth.toStringMillimeters(),
				maxWidthMillimeters: this.maxAssortmentSize.width.toStringMillimeters(),
			});
		if (assortmentHeight.millimeters > this.maxAssortmentSize.height.millimeters)
			throw new AssortmentTooTallError({
				passedHeightMillimeters: assortmentHeight.toStringMillimeters(),
				maxHeightMillimeters: this.maxAssortmentSize.height.toStringMillimeters(),
			});
		if (assortmentLength.millimeters > this.maxAssortmentSize.length.millimeters)
			throw new AssortmentTooLongError({
				passedLengthMillimeters: assortmentLength.toStringMillimeters(),
				maxLengthMillimeters: this.maxAssortmentSize.length.toStringMillimeters(),
			});

		const { minimalCelsius, maximalCelsius } = assortment.temperatureRange;

		const assortmentMinimalTemperature = CelsiusDegrees.fromNumber(minimalCelsius);
		const assortmentMaximalTemperature = CelsiusDegrees.fromNumber(maximalCelsius);

		if (assortmentMinimalTemperature > this.temperatureRange.maximal)
			throw new ShelfTooColdForAssortmentError({
				assortmentMinimalTemperatureCelsius: assortmentMinimalTemperature.toString(),
				shelfMaximalTemperatureCelsius: this.temperatureRange.maximal.toString(),
			});
		if (assortmentMaximalTemperature < this.temperatureRange.minimal)
			throw new ShelfTooHotForAssortmentError({
				assortmentMaximalTemperatureCelsius: assortmentMaximalTemperature.toString(),
				shelfMinimalTemperatureCelsius: this.temperatureRange.minimal.toString(),
			});

		if (assortment.isHazardous && !this.supportsHazardous)
			throw new AssortmentIsHazardousError({ shelfId: this.id.value });
	}

	private validateAllAssortment() {
		const assortments = this.cells.flat().map((cell) => cell.assortment);
		for (const assortment of assortments) {
			if (assortment === null) continue;

			this.validateAssortment(assortment);
		}
	}

	private validateNewAssortment(assortment: AssortmentVO) {
		const emptyCell = this.cells.flat().find((cell) => cell.assortment === null);
		if (!emptyCell) throw new ShelfFullError({ id: this.id.value });

		this.validateAssortment(assortment);
	}

	public validate() {
		this.validateCells();
		this.validateAllAssortment();
		this.validateWeight();
	}

	public updateHasBeenChangedIllegally() {
		const lastRecordedWeight = this.lastRecordedLegalWeight;
		const currentWeight = this.getTotalWeight();

		this.hasBeenChangedIllegally = lastRecordedWeight.grams.value !== currentWeight.grams.value;
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

		throw new CellNotFoundError({ id: id.value });
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

	public addTemperatureReading(temperatureReading: TemperatureReading) {
		this._temperatureReadingIds.push(temperatureReading.id);
	}

	public addWeightReading(weightReading: WeightReading) {
		this._weightReadingIds.push(weightReading.id);
	}
}
