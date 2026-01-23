import { MigrationInterface, QueryRunner } from "typeorm";

export class Reports1769135049006 implements MigrationInterface {
	name = 'Reports1769135049006'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE "temperature_readings" ("id" character varying NOT NULL, "shelf_id" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "temperature_celsius" double precision NOT NULL, "temperature_was_too_low" boolean NOT NULL, "temperature_was_too_high" boolean NOT NULL, CONSTRAINT "PK_8d0fc18a8e73d9162a9c3032f7f" PRIMARY KEY ("id"))`);
		await queryRunner.query(`CREATE TABLE "reports" ("id" character varying NOT NULL, "type" character varying NOT NULL, "generation_date" TIMESTAMP NOT NULL, "file_id" character varying NOT NULL, CONSTRAINT "PK_d9013193989303580053c0b5ef6" PRIMARY KEY ("id"))`);
		await queryRunner.query(`ALTER TABLE "shelves" ADD "temperature_reading_ids" character varying array NOT NULL`);
		await queryRunner.query(`ALTER TABLE "shelves" ADD "current_temperature_celsius" double precision NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "shelves" DROP COLUMN "current_temperature_celsius"`);
		await queryRunner.query(`ALTER TABLE "shelves" DROP COLUMN "temperature_reading_ids"`);
		await queryRunner.query(`DROP TABLE "reports"`);
		await queryRunner.query(`DROP TABLE "temperature_readings"`);
	}

}
