import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("cells")
export class DBCell {
	@PrimaryColumn()
	id!: string;

	@Column({ name: "shelf_id" })
	shelfId!: string;

	@Column({ name: "assortment_id", type: "varchar", nullable: true })
	assortmentId!: string | null;

	@Column()
	x!: number;

	@Column()
	y!: number;

	@Column()
	index!: number;
}
