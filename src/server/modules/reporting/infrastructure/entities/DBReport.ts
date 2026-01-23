import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("reports")
export class DBReport {
	@PrimaryColumn()
	id!: string;

	@Column()
	type!: string;

	@Column({ name: "generation_date" })
	generationDate!: Date;

	@Column({ name: "file_id" })
	fileId!: string;
}
