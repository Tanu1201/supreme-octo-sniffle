import {MigrationInterface, QueryRunner} from "typeorm";

export class addZohoToken1706463917628 implements MigrationInterface {
    name = 'addZohoToken1706463917628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."zohoTokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accessToken" character varying NOT NULL, "expiresIn" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b0e78e384fffe679e33f98de069" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "public"."zohoTokens"`);
    }

}
