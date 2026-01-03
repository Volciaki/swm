import { CelsiusDegrees, Dimensions, DimensionsMapper, Distance, TemperatureRangeMapper, UUID, Weight } from "@/server/utils";
import { ShelfDTO } from "../../application/dto/shared/ShelfDTO";
import { Shelf } from "../../domain/entities/Shelf";
import { DBShelf } from "../entities/DBShelf";
import { DBCell } from "../entities/DBCell";
import { CellMapper } from "./CellMapper";

export class ShelfMapper {
    static fromShelfDTOToShelf(shelfDTO: ShelfDTO): Shelf {
        const { id, name, comment, cells, temperatureRange, maxWeightKg, maxAssortmentSize, supportsHazardous } = shelfDTO;
        return Shelf.create(
            UUID.fromString(id),
            name,
            comment,
            cells.map((row) => row.map((cell) => CellMapper.fromCellDTOToCell(cell))),
            TemperatureRangeMapper.fromDTO(temperatureRange),
            Weight.fromKilograms(maxWeightKg),
            DimensionsMapper.fromDTO(maxAssortmentSize),
            supportsHazardous,
        );
    }

    static fromShelfToShelfDTO(shelf: Shelf): ShelfDTO {
        const { id, temperatureRange, maxAssortmentSize, maxWeight, cells, comment, name, supportsHazardous } = shelf;
        return {
            id: id.value,
            temperatureRange: {
                maximalCelsius: temperatureRange.maximal.value,
                minimalCelsius: temperatureRange.minimal.value,
            },
            maxAssortmentSize: {
                lengthMillimeters: maxAssortmentSize.length.millimeters,
                heightMillimeters: maxAssortmentSize.height.millimeters,
                widthMillimeters: maxAssortmentSize.width.millimeters,
            },
            maxWeightKg: maxWeight.kilograms,
            cells: cells.map((row) => row.map((cell) => CellMapper.fromCellToCellDTO(cell))),
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
        } = shelf;

        dbShelf.id = id.value;
        dbShelf.maxWeightKg = maxWeight.kilograms;
        dbShelf.cellIds = cells.map((row) => row.map((cell) => cell.id.value));
        dbShelf.temperatureRangeMax = temperatureRange.maximal.value;
        dbShelf.temperatureRangeMin = temperatureRange.minimal.value;
        dbShelf.name = name;
        dbShelf.comment = comment;
        dbShelf.supportsHazardous = supportsHazardous;
        dbShelf.maxAssortmentSizeWidthMillimeters = maxAssortmentSize.width.millimeters;
        dbShelf.maxAssortmentSizeHeightMillimeters = maxAssortmentSize.height.millimeters;
        dbShelf.maxAssortmentSizeLengthMillimeters = maxAssortmentSize.length.millimeters;

        return dbShelf;
    }

    static fromDBShelfToShelf(dbShelf: DBShelf, dbCells: DBCell[][]): Shelf {
        const maxAssortmentSize = Dimensions.create(
            Distance.fromMillimeters(dbShelf.maxAssortmentSizeWidthMillimeters),
            Distance.fromMillimeters(dbShelf.maxAssortmentSizeHeightMillimeters),
            Distance.fromMillimeters(dbShelf.maxAssortmentSizeLengthMillimeters),
        );
        return Shelf.create(
            UUID.fromString(dbShelf.id),
            dbShelf.name,
            dbShelf.comment,
            // TODO: get the assortment here.
            dbCells.map((row) => row.map((cell) => CellMapper.fromDBCellToCell(cell, null))),
            {
                maximal: CelsiusDegrees.fromNumber(dbShelf.temperatureRangeMax),
                minimal: CelsiusDegrees.fromNumber(dbShelf.temperatureRangeMin),
            },
            Weight.fromKilograms(dbShelf.maxWeightKg),
            maxAssortmentSize,
            dbShelf.supportsHazardous,
        );
    }
}
