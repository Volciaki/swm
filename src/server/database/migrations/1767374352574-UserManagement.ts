import { MigrationInterface, QueryRunner } from "typeorm";

export class UserManagement1767374352574 implements MigrationInterface {
    name = "UserManagement1767374352574"

    public async up(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query("CREATE TABLE \"users\" (\"id\" character varying NOT NULL, \"email\" character varying NOT NULL, \"password_hash\" character varying NOT NULL, \"name\" character varying NOT NULL, \"is_admin\" boolean NOT NULL, \"two_factor_authentication_enabled\" boolean NOT NULL, CONSTRAINT \"PK_a3ffb1c0c8416b9fc6f907b7433\" PRIMARY KEY (\"id\"))");
    	await queryRunner.query("CREATE TABLE \"two_factor_authentication_sessions\" (\"id\" character varying NOT NULL, \"value\" character varying NOT NULL, \"user_id\" character varying NOT NULL, CONSTRAINT \"PK_3e3a01fc608ff1091978933195b\" PRIMARY KEY (\"id\"))");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query("DROP TABLE \"two_factor_authentication_sessions\"");
    	await queryRunner.query("DROP TABLE \"users\"");
    }
}
