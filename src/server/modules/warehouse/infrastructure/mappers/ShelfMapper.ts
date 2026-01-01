import { DimensionsMapper, TemperatureRangeMapper, UUID, Weight } from "@/server/utils";
import { ShelfDTO } from "../../application/dto/shared/ShelfDTO";
import { Shelf } from "../../domain/entities/Shelf";
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
}
