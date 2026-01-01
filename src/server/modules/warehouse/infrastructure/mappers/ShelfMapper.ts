import { CelsiusDegrees, Dimensions, DimensionsMapper, Distance, TemperatureRangeMapper, UUID, Weight } from "@/server/utils";
import { ShelfDTO } from "../../application/dto/shared/ShelfDTO";
import { Shelf } from "../../domain/entities/Shelf";
import { DBShelf } from "../entities/DBShelf";
import { DBCell } from "../entities/DBCell";
import { CellMapper } from "./CellMapper";

export class ShelfMapper {
    static fromShelfDTOToShelf(shelfDTO: ShelfDTO): Shelf {
        const { id, name, comment, rows, columns, temperatureRange, maxWeightKg, maxAssortmentSize } = shelfDTO;
        return Shelf.create(
            UUID.fromString(id),
            name,
            comment,
            rows.map((row) => CellMapper.fromCellDTOToCell(row)),
            columns.map((column) => CellMapper.fromCellDTOToCell(column)),
            TemperatureRangeMapper.fromDTO(temperatureRange),
            Weight.fromKilograms(maxWeightKg),
            DimensionsMapper.fromDTO(maxAssortmentSize),
        );
    }

    static fromShelfToShelfDTO(shelf: Shelf): ShelfDTO {
        const { id, temperatureRange, maxAssortmentSize, maxWeight, columns, rows, comment, name } = shelf;
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
            columns: columns.map((column) => CellMapper.fromCellToCellDTO(column)),
            rows: rows.map((row) => CellMapper.fromCellToCellDTO(row)),
            comment,
            name,
        };
    }

    static fromShelfToDBShelf(shelf: Shelf): DBShelf {
        const dbShelf = new DBShelf();
        const {
            id,
            name,
            comment,
            temperatureRange,
            columns,
            rows,
            maxWeight,
            maxAssortmentSize,
        } = shelf;

        dbShelf.id = id.value;
        dbShelf.maxWeightKg = maxWeight.kilograms;
        dbShelf.rowIds = rows.map((row) => row.id.value);
        dbShelf.columnIds = columns.map((column) => column.id.value);
        dbShelf.temperatureRangeMax = temperatureRange.maximal.value;
        dbShelf.temperatureRangeMin = temperatureRange.minimal.value;
        dbShelf.name = name;
        dbShelf.comment = comment;
        dbShelf.maxAssortmentSizeWidthMillimeters = maxAssortmentSize.width.millimeters;
        dbShelf.maxAssortmentSizeHeightMillimeters = maxAssortmentSize.height.millimeters;
        dbShelf.maxAssortmentSizeLengthMillimeters = maxAssortmentSize.length.millimeters;

        return dbShelf;
    }

    static fromDBShelfToShelf(dbShelf: DBShelf, dbRows: DBCell[], dbColumns: DBCell[]): Shelf {
        const maxAssortmentSize = Dimensions.create(
            Distance.fromMillimeters(dbShelf.maxAssortmentSizeWidthMillimeters),
            Distance.fromMillimeters(dbShelf.maxAssortmentSizeHeightMillimeters),
            Distance.fromMillimeters(dbShelf.maxAssortmentSizeLengthMillimeters),
        );
        return Shelf.create(
            UUID.fromString(dbShelf.id),
            dbShelf.name,
            dbShelf.comment,
            dbRows.map((row) => CellMapper.fromDBCellToCell(row)),
            dbColumns.map((column) => CellMapper.fromDBCellToCell(column)),
            {
                maximal: CelsiusDegrees.fromNumber(dbShelf.temperatureRangeMax),
                minimal: CelsiusDegrees.fromNumber(dbShelf.temperatureRangeMin),
            },
            Weight.fromKilograms(dbShelf.maxWeightKg),
            maxAssortmentSize,
        );
    }
}
