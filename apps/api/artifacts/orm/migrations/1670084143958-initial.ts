import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1670084143958 implements MigrationInterface {
	name = 'initial1670084143958';

	public async up(queryRunner: QueryRunner): Promise<void> {
		// Api key
		await queryRunner.query(
			`CREATE TYPE "public"."api_key_audiences_enum" AS ENUM('GENERAL', 'ADMIN')`,
		);
		await queryRunner.query(
			`CREATE TABLE "api_key" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "client" character varying NOT NULL, "description" character varying NOT NULL, "key" character varying NOT NULL, "audience" "public"."api_key_audiences_enum" NOT NULL DEFAULT 'GENERAL', CONSTRAINT "UQ_fb080786c16de6ace7ed0b69f7d" UNIQUE ("key"), CONSTRAINT "PK_b1bd840641b8acbaad89c3d8d11" PRIMARY KEY ("id"))`,
		);

		// User
		await queryRunner.query(
			`CREATE TYPE "public"."user_audiences_enum" AS ENUM('GENERAL', 'ADMIN')`,
		);
		await queryRunner.query(
			`CREATE TABLE "user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "audiences" "public"."user_audiences_enum" array NOT NULL DEFAULT '{GENERAL}', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
		);

		// Message
		await queryRunner.query(
			`CREATE TABLE "message" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" character varying NOT NULL, "eventId" character varying NOT NULL, "eventName" character varying NOT NULL, "data" jsonb NOT NULL, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "message"`);
		await queryRunner.query(`DROP TABLE "user"`);
		await queryRunner.query(`DROP TABLE "api_key"`);
		await queryRunner.query(`DROP TYPE "public"."user_audiences_enum"`);
		await queryRunner.query(`DROP TYPE "public"."api_key_audiences_enum"`);
	}
}
