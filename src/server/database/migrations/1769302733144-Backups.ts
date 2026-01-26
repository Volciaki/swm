import type { MigrationInterface, QueryRunner } from "typeorm";

export class Backups1769302733144 implements MigrationInterface {
	name = "Backups1769302733144";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'CREATE TABLE "backups" ("id" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "file_id" character varying NOT NULL, CONSTRAINT "PK_ca30ff369eddfc7dac3b35d0d3c" PRIMARY KEY ("id"))'
		);
		await queryRunner.query(
			'CREATE TABLE "backup_settings" ("id" character varying NOT NULL, "take_backups_every_seconds" integer NOT NULL, CONSTRAINT "PK_bae1cf1091b1f856098097f9510" PRIMARY KEY ("id"))'
		);
		await queryRunner.query('ALTER TABLE "file_references" ADD "is_encrypted" boolean NOT NULL');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "file_references" DROP COLUMN "is_encrypted"');
		await queryRunner.query('DROP TABLE "backup_settings"');
		await queryRunner.query('DROP TABLE "backups"');
	}
}
