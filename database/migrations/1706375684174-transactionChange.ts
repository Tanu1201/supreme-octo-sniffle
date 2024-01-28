import {MigrationInterface, QueryRunner} from "typeorm";

export class transactionChange1706375684174 implements MigrationInterface {
    name = 'transactionChange1706375684174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."transactions" RENAME COLUMN "text" TO "filePath"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."transactions" RENAME COLUMN "filePath" TO "text"`);
    }

}
