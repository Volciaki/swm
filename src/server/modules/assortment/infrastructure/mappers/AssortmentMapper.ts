import { CelsiusDegrees, Dimensions, Distance, TimeFrame, UUID, Weight } from "@/server/utils";
import { Assortment } from "../../domain/entities/Assortment";
import { DBAssortment } from "../entities/DBAssortment";
import { AssortmentDTO } from "../../application/dto/shared/AssortmentDTO";

export class AssortmentMapper {
    static fromAssortmentToDBAssortment(assortment: Assortment): DBAssortment {
        const dbAssortment = new DBAssortment();

        const { id, name, size, weight, comment, storedAt, expiresAfter, temperatureRange, isHazardous } = assortment;
        dbAssortment.id = id.value;
        dbAssortment.name = name;
        dbAssortment.sizeWidthMillimeters = size.width.millimeters;
        dbAssortment.sizeHeightMillimeters = size.height.millimeters;
        dbAssortment.sizeLengthMillimeters = size.length.millimeters;
        dbAssortment.weightKg = weight.kilograms;
        dbAssortment.comment = comment;
        dbAssortment.storedAt = storedAt;
        dbAssortment.expiresAfterSeconds = expiresAfter.seconds;
        dbAssortment.temperatureRangeMin = temperatureRange.minimal.value;
        dbAssortment.temperatureRangeMax = temperatureRange.maximal.value;
        dbAssortment.isHazardous = isHazardous;

        return dbAssortment;
    }

    static fromDBAssortmentToAssortment(dbAssortment: DBAssortment): Assortment {
        return Assortment.create(
            UUID.fromString(dbAssortment.id),
            dbAssortment.name,
            {
                minimal: CelsiusDegrees.fromNumber(dbAssortment.temperatureRangeMin),
                maximal: CelsiusDegrees.fromNumber(dbAssortment.temperatureRangeMax),
            },
            Weight.fromKilograms(dbAssortment.weightKg),
            Dimensions.create(
                Distance.fromMillimeters(dbAssortment.sizeWidthMillimeters),
                Distance.fromMillimeters(dbAssortment.sizeHeightMillimeters),
                Distance.fromMillimeters(dbAssortment.sizeLengthMillimeters),
            ),
            dbAssortment.comment,
            dbAssortment.storedAt,
            TimeFrame.fromSeconds(dbAssortment.expiresAfterSeconds),
            dbAssortment.isHazardous,
        );
    }

    static fromAssortmentToAssortmentDTO(assortment: Assortment): AssortmentDTO {
        return {
            id: assortment.id.value,
            name: assortment.name,
            temperatureRange: {
                maximalCelsius: assortment.temperatureRange.maximal.value,
                minimalCelsius: assortment.temperatureRange.minimal.value,
            },
            weightKg: assortment.weight.kilograms,
            size: {
                lengthMillimeters: assortment.size.length.millimeters,
                heightMillimeters: assortment.size.height.millimeters,
                widthMillimeters: assortment.size.width.millimeters,
            },
            comment: assortment.comment,
            storedAtTimestamp: assortment.storedAt.getTime(),
            expiresAfterSeconds: assortment.expiresAfter.seconds,
            isHazardous: assortment.isHazardous,
        };
    }

    static fromAssortmentDTOToAssortment(assortmentDTO: AssortmentDTO): Assortment {
        return Assortment.create(
            UUID.fromString(assortmentDTO.id),
            assortmentDTO.name,
            {
                minimal: CelsiusDegrees.fromNumber(assortmentDTO.temperatureRange.minimalCelsius),
                maximal: CelsiusDegrees.fromNumber(assortmentDTO.temperatureRange.maximalCelsius),
            },
            Weight.fromKilograms(assortmentDTO.weightKg),
            Dimensions.create(
                Distance.fromMillimeters(assortmentDTO.size.widthMillimeters),
                Distance.fromMillimeters(assortmentDTO.size.heightMillimeters),
                Distance.fromMillimeters(assortmentDTO.size.lengthMillimeters),
            ),
            assortmentDTO.comment,
            new Date(assortmentDTO.storedAtTimestamp),
            TimeFrame.fromSeconds(assortmentDTO.expiresAfterSeconds),
            assortmentDTO.isHazardous,
        );
    }
}
