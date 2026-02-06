import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("weight_readings")
export class DBWeightReading {
	@PrimaryColumn()
	id!: string;

	@Column({ name: "shelf_id" })
	shelfId!: string;

	@Column()
	date!: Date;

	@Column({ name: "weight_kilograms", type: "float" })
	weightKilograms!: number;
}
