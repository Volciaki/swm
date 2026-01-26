import { MigrationInterface, QueryRunner } from "typeorm";

export class FilesSupport1768605019891 implements MigrationInterface {
	name = "FilesSupport1768605019891";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query("CREATE TABLE \"file_references\" (\"id\" character varying NOT NULL, \"size_bytes\" integer NOT NULL, \"mime_type\" character varying NOT NULL, \"path\" character varying NOT NULL, \"is_public\" boolean NOT NULL, \"public_url\" character varying, \"metadata\" json NOT NULL, CONSTRAINT \"PK_29140177cb876eafdee7340dccc\" PRIMARY KEY (\"id\"))");
		await queryRunner.query("ALTER TABLE \"assortments\" ADD \"qr_code_file_reference_id\" character varying NOT NULL");
		await queryRunner.query("ALTER TABLE \"assortments\" ADD \"image_file_reference_id\" character varying");
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query("ALTER TABLE \"assortments\" DROP COLUMN \"image_file_reference_id\"");
		await queryRunner.query("ALTER TABLE \"assortments\" DROP COLUMN \"qr_code_file_reference_id\"");
		await queryRunner.query("DROP TABLE \"file_references\"");
	}

}
