import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("assortments")
export class DBAssortment {
	@PrimaryColumn()
	id!: string;

	@Column({ name: "cell_id" })
	cellId!: string;

	@Column({ name: "shelf_id" })
	shelfId!: string;

	@Column({ name: "definition_id" })
	definitionId!: string;

	@Column({ name: "stored_at" })
	storedAt!: Date;

	@Column({ name: "has_expired" })
	hasExpired!: boolean;

	@Column({ name: "has_expired_notification_id", type: "varchar", nullable: true })
	hasExpiredNotificationId!: string | null;

	@Column({ name: "is_close_to_expiration" })
	isCloseToExpiration!: boolean;

	@Column({ name: "is_close_to_expiration_notification_id", type: "varchar", nullable: true })
	isCloseToExpirationNotificationId!: string | null;
}
