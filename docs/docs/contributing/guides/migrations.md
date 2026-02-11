---
sidebar_position: 2
---

# Migrations

We're using [TypeORM](https://github.com/typeorm/typeorm) as our database ORM. Luckily, generating migrations with it is rather easy, as most of the process is automated.

To generate migration code you can simply run:

```shell
$ yarn migrations:generate <migration-name>
```

This will:

1. Take the current database schema.
2. Compare it to the one defined in the codebase.
3. Generate any SQL necessary to modify the current database schema to match the one defined in code.

Here's how a ready migration looks like:

```ts
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
```

You might have to reformat it (to match ESLint rules), and then import it in [`src/server/database/migrations/index.ts`](https://github.com/Volciaki/swm/blob/master/src/server/database/migrations/index.ts).
