import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductManagement1767716678378 implements MigrationInterface {
    name = 'ProductManagement1767716678378'

    public async up(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query(`CREATE TABLE "shelves" ("id" character varying NOT NULL, "name" character varying NOT NULL, "comment" character varying NOT NULL, "cell_ids" json NOT NULL, "temperature_range_max" double precision NOT NULL, "temperature_range_min" double precision NOT NULL, "max_weight_kg" double precision NOT NULL, "max_assortment_size_width_mm" double precision NOT NULL, "max_assortment_size_height_mm" double precision NOT NULL, "max_assortment_size_length_mm" double precision NOT NULL, "supports_hazardous" boolean NOT NULL, CONSTRAINT "PK_108bc01962c9c1c8726cef8fdd3" PRIMARY KEY ("id"))`);
    	await queryRunner.query(`CREATE TABLE "cells" ("id" character varying NOT NULL, "shelf_id" character varying NOT NULL, "assortment_id" character varying, CONSTRAINT "PK_b9443df02c1a41bc03f264388c8" PRIMARY KEY ("id"))`);
    	await queryRunner.query(`CREATE TABLE "assortments" ("id" character varying NOT NULL, "cellId" character varying NOT NULL, "shelfId" character varying NOT NULL, "name" character varying NOT NULL, "comment" character varying NOT NULL, "temperature_range_max" double precision NOT NULL, "temperature_range_min" double precision NOT NULL, "weight_kg" double precision NOT NULL, "size_width_mm" double precision NOT NULL, "size_height_mm" double precision NOT NULL, "size_length_mm" double precision NOT NULL, "stored_at" TIMESTAMP NOT NULL, "expires_after_seconds" integer NOT NULL, "is_hazardous" boolean NOT NULL, CONSTRAINT "PK_990a0516cb75a71dc315f08f334" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query(`DROP TABLE "assortments"`);
    	await queryRunner.query(`DROP TABLE "cells"`);
    	await queryRunner.query(`DROP TABLE "shelves"`);
    }
}
