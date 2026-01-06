import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("shelves")
export class DBShelf {
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    comment!: string;

    @Column({ name: "cell_ids", type: "json" })
    cellIds!: string[][];

    @Column({ name: "temperature_range_max", type: "float" })
    temperatureRangeMax!: number;

    @Column({ name: "temperature_range_min", type: "float" })
    temperatureRangeMin!: number;

    @Column({ name: "max_weight_kg", type: "float" })
    maxWeightKg!: number;

    @Column({ name: "max_assortment_size_width_mm", type: "float" })
    maxAssortmentSizeWidthMillimeters!: number;

    @Column({ name: "max_assortment_size_height_mm", type: "float" })
    maxAssortmentSizeHeightMillimeters!: number;

    @Column({ name: "max_assortment_size_length_mm", type: "float" })
    maxAssortmentSizeLengthMillimeters!: number;

    @Column({ name: "supports_hazardous" })
    supportsHazardous!: boolean;
}
