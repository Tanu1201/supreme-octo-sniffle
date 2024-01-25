import {MigrationInterface, QueryRunner} from "typeorm";

export class addDatesToGroup1706083675078 implements MigrationInterface {
    name = 'addDatesToGroup1706083675078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."group" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."group" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."group" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "public"."group" DROP COLUMN "createdAt"`);
    }

}
