import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("backups")
export class DBBackup {
	@PrimaryColumn()
	id!: string;

	@Column()
	date!: Date;

	@Column({ name: "file_id" })
	fileId!: string;
}
