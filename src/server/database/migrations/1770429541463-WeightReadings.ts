import type { MigrationInterface, QueryRunner } from "typeorm";

export class WeightReadings1770429541463 implements MigrationInterface {
	name = "WeightReadings1770429541463";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'CREATE TABLE "weight_readings" ("id" character varying NOT NULL, "shelf_id" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "weight_kilograms" double precision NOT NULL, CONSTRAINT "PK_1b9576b5f86be2040a8a0850bb0" PRIMARY KEY ("id"))'
		);
		await queryRunner.query('ALTER TABLE "shelves" ADD "weight_reading_ids" character varying array NOT NULL');
		await queryRunner.query('ALTER TABLE "shelves" ADD "current_weight_kilograms" double precision NOT NULL');
		await queryRunner.query('ALTER TABLE "cells" ADD "x" integer NOT NULL');
		await queryRunner.query('ALTER TABLE "cells" ADD "y" integer NOT NULL');
		await queryRunner.query('ALTER TABLE "cells" ADD "index" integer NOT NULL');
		await queryRunner.query('ALTER TABLE "assortments" ADD "put_up_by_user_id" character varying NOT NULL');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "put_up_by_user_id"');
		await queryRunner.query('ALTER TABLE "cells" DROP COLUMN "index"');
		await queryRunner.query('ALTER TABLE "cells" DROP COLUMN "y"');
		await queryRunner.query('ALTER TABLE "cells" DROP COLUMN "x"');
		await queryRunner.query('ALTER TABLE "shelves" DROP COLUMN "current_weight_kilograms"');
		await queryRunner.query('ALTER TABLE "shelves" DROP COLUMN "weight_reading_ids"');
		await queryRunner.query('DROP TABLE "weight_readings"');
	}
}
