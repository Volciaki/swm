import type { MigrationInterface, QueryRunner } from "typeorm";

export class AssortmentDefinitions1770086671994 implements MigrationInterface {
	name = "AssortmentDefinitions1770086671994";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'CREATE TABLE "assortment_definitions" ("id" character varying NOT NULL, "name" character varying NOT NULL, "comment" character varying NOT NULL, "temperature_range_max" double precision NOT NULL, "temperature_range_min" double precision NOT NULL, "weight_kg" double precision NOT NULL, "size_width_mm" double precision NOT NULL, "size_height_mm" double precision NOT NULL, "size_length_mm" double precision NOT NULL, "expires_after_seconds" integer NOT NULL, "is_hazardous" boolean NOT NULL, "qr_code_file_reference_id" character varying NOT NULL, "image_file_reference_id" character varying, CONSTRAINT "PK_b7a4f21ba0f395c5166a7f40a07" PRIMARY KEY ("id"))'
		);
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "cellId"');
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "shelfId"');
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "name"');
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "comment"');
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "temperature_range_max"');
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "temperature_range_min"');
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "weight_kg"');
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "size_width_mm"');
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "size_height_mm"');
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "size_length_mm"');
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "expires_after_seconds"');
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "is_hazardous"');
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "qr_code_file_reference_id"');
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "image_file_reference_id"');
		await queryRunner.query('ALTER TABLE "assortments" ADD "cell_id" character varying NOT NULL');
		await queryRunner.query('ALTER TABLE "assortments" ADD "shelf_id" character varying NOT NULL');
		await queryRunner.query('ALTER TABLE "assortments" ADD "definition_id" character varying NOT NULL');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "definition_id"');
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "shelf_id"');
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "cell_id"');
		await queryRunner.query('ALTER TABLE "assortments" ADD "image_file_reference_id" character varying');
		await queryRunner.query('ALTER TABLE "assortments" ADD "qr_code_file_reference_id" character varying NOT NULL');
		await queryRunner.query('ALTER TABLE "assortments" ADD "is_hazardous" boolean NOT NULL');
		await queryRunner.query('ALTER TABLE "assortments" ADD "expires_after_seconds" integer NOT NULL');
		await queryRunner.query('ALTER TABLE "assortments" ADD "size_length_mm" double precision NOT NULL');
		await queryRunner.query('ALTER TABLE "assortments" ADD "size_height_mm" double precision NOT NULL');
		await queryRunner.query('ALTER TABLE "assortments" ADD "size_width_mm" double precision NOT NULL');
		await queryRunner.query('ALTER TABLE "assortments" ADD "weight_kg" double precision NOT NULL');
		await queryRunner.query('ALTER TABLE "assortments" ADD "temperature_range_min" double precision NOT NULL');
		await queryRunner.query('ALTER TABLE "assortments" ADD "temperature_range_max" double precision NOT NULL');
		await queryRunner.query('ALTER TABLE "assortments" ADD "comment" character varying NOT NULL');
		await queryRunner.query('ALTER TABLE "assortments" ADD "name" character varying NOT NULL');
		await queryRunner.query('ALTER TABLE "assortments" ADD "shelfId" character varying NOT NULL');
		await queryRunner.query('ALTER TABLE "assortments" ADD "cellId" character varying NOT NULL');
		await queryRunner.query('DROP TABLE "assortment_definitions"');
	}
}
