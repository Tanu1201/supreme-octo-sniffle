import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUser1706011039771 implements MigrationInterface {
  name = 'addUser1706011039771';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "refreshToken" character varying, "createdById" uuid, CONSTRAINT "UQ_12ffa5c867f6bb71e2690a526ce" UNIQUE ("email"), CONSTRAINT "PK_a6cc71bedf15a41a5f5ee8aea97" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_12ffa5c867f6bb71e2690a526c" ON "public"."users" ("email") `);
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD CONSTRAINT "FK_49f39ebbcee9e2204897f4cfed5" FOREIGN KEY ("createdById") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."users" DROP CONSTRAINT "FK_49f39ebbcee9e2204897f4cfed5"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_12ffa5c867f6bb71e2690a526c"`);
    await queryRunner.query(`DROP TABLE "public"."users"`);
  }
}
