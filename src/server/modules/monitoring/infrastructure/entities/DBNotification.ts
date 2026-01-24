import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("notifications")
export class DBNotification {
	@PrimaryColumn()
	id!: string;

	@Column()
	type!: string;

	@Column({ name: "issued_date" })
	issuedDate!: Date;

	@Column()
	title!: string;

	@Column()
	message!: string;
}
