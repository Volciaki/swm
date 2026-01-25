import { Entity, PrimaryColumn, Column } from "typeorm";
import { type FileMetadataDTO } from "../../application/dto/shared/FileMetadataDTO";

@Entity("file_references")
export class DBFileReference {
	@PrimaryColumn()
	id!: string;

	@Column({ name: "size_bytes" })
	sizeBytes!: number;

	@Column({ name: "mime_type" })
	mimeType!: string;

	@Column()
	path!: string;

	@Column({ name: "is_public" })
	isPublic!: boolean;

	@Column({ name: "public_url", type: "varchar", nullable: true })
	publicUrl!: string | null;

	@Column({ type: "json" })
	metadata!: FileMetadataDTO;

	@Column({ name: "is_encrypted" })
	isEncrypted!: boolean;
}
