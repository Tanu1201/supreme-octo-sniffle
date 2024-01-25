import {MigrationInterface, QueryRunner} from "typeorm";

export class addGroup1706031202081 implements MigrationInterface {
    name = 'addGroup1706031202081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."userGroups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "groupId" uuid NOT NULL, CONSTRAINT "PK_a18c618804c7ff48aa1eb8227a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "adminId" uuid, CONSTRAINT "PK_fe845bf655bc27966bd9225d968" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."userGroups" ADD CONSTRAINT "FK_f339b2ce60cfc35829e4410a6e8" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."userGroups" ADD CONSTRAINT "FK_f02adfe21a595a337c8adfc62b2" FOREIGN KEY ("groupId") REFERENCES "public"."group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."group" ADD CONSTRAINT "FK_0a6b1e2d32cd59e4e6e001b881f" FOREIGN KEY ("adminId") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."group" DROP CONSTRAINT "FK_0a6b1e2d32cd59e4e6e001b881f"`);
        await queryRunner.query(`ALTER TABLE "public"."userGroups" DROP CONSTRAINT "FK_f02adfe21a595a337c8adfc62b2"`);
        await queryRunner.query(`ALTER TABLE "public"."userGroups" DROP CONSTRAINT "FK_f339b2ce60cfc35829e4410a6e8"`);
        await queryRunner.query(`DROP TABLE "public"."group"`);
        await queryRunner.query(`DROP TABLE "public"."userGroups"`);
    }

}
