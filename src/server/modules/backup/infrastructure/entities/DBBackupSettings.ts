import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("backup_settings")
export class DBBackupSettings {
	@PrimaryColumn()
	id!: string;

	@Column({ name: "take_backups_every_seconds" })
	takeBackupsEverySeconds!: number;
}
