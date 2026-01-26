import type { MigrationInterface, QueryRunner } from "typeorm";

export class Notifications1768853259695 implements MigrationInterface {
	name = "Notifications1768853259695";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'CREATE TABLE "notifications" ("id" character varying NOT NULL, "type" character varying NOT NULL, "issued_date" TIMESTAMP NOT NULL, "title" character varying NOT NULL, "message" character varying NOT NULL, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))'
		);
		await queryRunner.query('ALTER TABLE "shelves" ADD "last_recorded_legal_weight_kg" double precision NOT NULL');
		await queryRunner.query('ALTER TABLE "assortments" ADD "has_expired" boolean NOT NULL');
		await queryRunner.query('ALTER TABLE "assortments" ADD "has_expired_notification_id" character varying');
		await queryRunner.query('ALTER TABLE "assortments" ADD "is_close_to_expiration" boolean NOT NULL');
		await queryRunner.query('ALTER TABLE "assortments" ADD "is_close_to_expiration_notification_id" character varying');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "is_close_to_expiration_notification_id"');
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "is_close_to_expiration"');
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "has_expired_notification_id"');
		await queryRunner.query('ALTER TABLE "assortments" DROP COLUMN "has_expired"');
		await queryRunner.query('ALTER TABLE "shelves" DROP COLUMN "last_recorded_legal_weight_kg"');
		await queryRunner.query('DROP TABLE "notifications"');
	}
}
