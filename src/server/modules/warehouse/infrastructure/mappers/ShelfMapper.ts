import { CelsiusDegrees, DimensionsMapper, TemperatureRangeMapper, UUID, Weight } from "@/server/utils";
import type { ShelfDTO } from "../../application/dto/shared/ShelfDTO";
import { Shelf } from "../../domain/entities/Shelf";
import { DBShelf } from "../entities/DBShelf";
import type { DBCell } from "../entities/DBCell";
import { CellMapper } from "./CellMapper";
import type { AssortmentVO } from "../../domain/vo/AssortmentVO";

export type CellWithContext = {
	db: DBCell;
	valueObject: AssortmentVO | null;
};

export class ShelfMapper {
	static fromShelfDTOToShelf(shelfDTO: ShelfDTO): Shelf {
		return Shelf.create(
			UUID.fromString(shelfDTO.id),
			shelfDTO.name,
			shelfDTO.comment,
			shelfDTO.cells.map((row) => row.map((cell) => CellMapper.fromCellDTOToCell(cell))),
			TemperatureRangeMapper.fromDTO(shelfDTO.temperatureRange),
			Weight.fromKilograms(shelfDTO.maxWeightKg),
			DimensionsMapper.fromDTO(shelfDTO.maxAssortmentSize),
			shelfDTO.supportsHazardous,
			Weight.fromKilograms(shelfDTO.lastRecordedLegalWeightKg),
			shelfDTO.temperatureReadingIds.map((id) => UUID.fromString(id)),
			CelsiusDegrees.fromNumber(shelfDTO.currentTemperatureCelsius)
		);
	}

	static fromShelfToShelfDTO(shelf: Shelf): ShelfDTO {
		return {
			id: shelf.id.value,
			temperatureRange: TemperatureRangeMapper.toDTO(shelf.temperatureRange),
			maxAssortmentSize: DimensionsMapper.toDTO(shelf.maxAssortmentSize),
			maxWeightKg: shelf.maxWeight.kilograms.value,
			cells: shelf.cells.map((row) => row.map((cell) => CellMapper.fromCellToCellDTO(cell))),
			lastRecordedLegalWeightKg: shelf.lastRecordedLegalWeight.kilograms.value,
			temperatureReadingIds: shelf.temperatureReadingIds.map((id) => id.value),
			currentTemperatureCelsius: shelf.currentTemperature.value,
			comment: shelf.comment,
			name: shelf.name,
			supportsHazardous: shelf.supportsHazardous,
			hasBeenChangedIllegally: shelf.hasBeenChangedIllegally,
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
			temperatureReadingIds,
			currentTemperature,
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
		dbShelf.temperatureReadingIds = temperatureReadingIds.map((id) => id.value);
		dbShelf.currentTemperatureCelsius = currentTemperature.value;

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
			dbShelf.temperatureReadingIds.map((id) => UUID.fromString(id)),
			CelsiusDegrees.fromNumber(dbShelf.currentTemperatureCelsius)
		);
	}
}
