import { DimensionsMapper, TemperatureRangeMapper, UUID, Weight } from "@/server/utils";
import { ShelfDTO } from "../../application/dto/shared/ShelfDTO";
import { Shelf } from "../../domain/entities/Shelf";
import { DBShelf } from "../entities/DBShelf";
import { DBCell } from "../entities/DBCell";
import { CellMapper } from "./CellMapper";
import { AssortmentVO } from "../../domain/vo/AssortmentVO";

export type CellWithContext = {
    db: DBCell;
    valueObject: AssortmentVO | null;
};

export class ShelfMapper {
	static fromShelfDTOToShelf(shelfDTO: ShelfDTO): Shelf {
		const { id, name, comment, cells, temperatureRange, maxWeightKg, maxAssortmentSize, supportsHazardous, lastRecordedLegalWeightKg } = shelfDTO;
		return Shelf.create(
			UUID.fromString(id),
			name,
			comment,
			cells.map((row) => row.map((cell) => CellMapper.fromCellDTOToCell(cell))),
			TemperatureRangeMapper.fromDTO(temperatureRange),
			Weight.fromKilograms(maxWeightKg),
			DimensionsMapper.fromDTO(maxAssortmentSize),
			supportsHazardous,
			Weight.fromKilograms(lastRecordedLegalWeightKg),
		);
	}

	static fromShelfToShelfDTO(shelf: Shelf): ShelfDTO {
		const { id, temperatureRange, maxAssortmentSize, maxWeight, cells, comment, name, supportsHazardous, lastRecordedLegalWeight } = shelf;
		return {
			id: id.value,
			temperatureRange: TemperatureRangeMapper.toDTO(temperatureRange),
			maxAssortmentSize: DimensionsMapper.toDTO(maxAssortmentSize),
			maxWeightKg: maxWeight.kilograms.value,
			cells: cells.map((row) => row.map((cell) => CellMapper.fromCellToCellDTO(cell))),
			lastRecordedLegalWeightKg: lastRecordedLegalWeight.kilograms.value,
			comment,
			name,
			supportsHazardous,
		};
	}

	static fromShelfToDBShelf(shelf: Shelf): DBShelf {
		const dbShelf = new DBShelf();
		const {
			id,
			name,
			comment,
			temperatureRange,
			cells,
			maxWeight,
			maxAssortmentSize,
			supportsHazardous,
			lastRecordedLegalWeight,
		} = shelf;

		dbShelf.id = id.value;
		dbShelf.maxWeightKg = maxWeight.kilograms.value;
		dbShelf.cellIds = cells.map((row) => row.map((cell) => cell.id.value));
		dbShelf.temperatureRangeMax = temperatureRange.maximal.value;
		dbShelf.temperatureRangeMin = temperatureRange.minimal.value;
		dbShelf.name = name;
		dbShelf.comment = comment;
		dbShelf.supportsHazardous = supportsHazardous;
		dbShelf.maxAssortmentSizeWidthMillimeters = maxAssortmentSize.width.millimeters.value;
		dbShelf.maxAssortmentSizeHeightMillimeters = maxAssortmentSize.height.millimeters.value;
		dbShelf.maxAssortmentSizeLengthMillimeters = maxAssortmentSize.length.millimeters.value;
		dbShelf.lastRecordedLegalWeightKg = lastRecordedLegalWeight.kilograms.value;

		return dbShelf;
	}

	static fromDBShelfToShelf(dbShelf: DBShelf, cells: CellWithContext[][]): Shelf {
		return Shelf.create(
			UUID.fromString(dbShelf.id),
			dbShelf.name,
			dbShelf.comment,
			cells.map((row) => row.map((cell) => CellMapper.fromDBCellToCell(cell.db, cell.valueObject))),
			TemperatureRangeMapper.fromDTO({
				maximalCelsius: dbShelf.temperatureRangeMax,
				minimalCelsius: dbShelf.temperatureRangeMin,
			}),
			Weight.fromKilograms(dbShelf.maxWeightKg),
			DimensionsMapper.fromDTO({
				lengthMillimeters: dbShelf.maxAssortmentSizeLengthMillimeters,
				widthMillimeters: dbShelf.maxAssortmentSizeWidthMillimeters,
				heightMillimeters: dbShelf.maxAssortmentSizeHeightMillimeters,
			}),
			dbShelf.supportsHazardous,
			Weight.fromKilograms(dbShelf.lastRecordedLegalWeightKg),
		);
	}
}
