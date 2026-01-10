import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("assortments")
export class DBAssortment {
    @PrimaryColumn()
        id!: string;

    @Column()
        cellId!: string;

    @Column()
        shelfId!: string;

    @Column()
        name!: string;

    @Column()
        comment!: string;

    @Column({ name: "temperature_range_max", type: "float" })
        temperatureRangeMax!: number;

    @Column({ name: "temperature_range_min", type: "float" })
        temperatureRangeMin!: number;

    @Column({ name: "weight_kg", type: "float" })
        weightKg!: number;

    @Column({ name: "size_width_mm", type: "float" })
        sizeWidthMillimeters!: number;

    @Column({ name: "size_height_mm", type: "float" })
        sizeHeightMillimeters!: number;

    @Column({ name: "size_length_mm", type: "float" })
        sizeLengthMillimeters!: number;

    @Column({ name: "stored_at" })
        storedAt!: Date;

    @Column({ name: "expires_after_seconds" })
        expiresAfterSeconds!: number;

    @Column({ name: "is_hazardous" })
        isHazardous!: boolean;
}
