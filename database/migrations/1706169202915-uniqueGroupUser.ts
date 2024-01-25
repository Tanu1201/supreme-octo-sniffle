import {MigrationInterface, QueryRunner} from "typeorm";

export class uniqueGroupUser1706169202915 implements MigrationInterface {
    name = 'uniqueGroupUser1706169202915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."userGroups" ADD CONSTRAINT "UQ_700cc7bb3541410fc3c157668bf" UNIQUE ("userId", "groupId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."userGroups" DROP CONSTRAINT "UQ_700cc7bb3541410fc3c157668bf"`);
    }

}
