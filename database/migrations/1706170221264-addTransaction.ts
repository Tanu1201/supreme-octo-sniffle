import {MigrationInterface, QueryRunner} from "typeorm";

export class addTransaction1706170221264 implements MigrationInterface {
    name = 'addTransaction1706170221264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "groupId" uuid NOT NULL, "text" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_81c60dae871c53962866bb4a5e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."transactions" ADD CONSTRAINT "FK_93e6fcc5847cbe879c000cf5382" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."transactions" ADD CONSTRAINT "FK_211a777bbc89bd73c4aa59b030e" FOREIGN KEY ("groupId") REFERENCES "public"."group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."transactions" DROP CONSTRAINT "FK_211a777bbc89bd73c4aa59b030e"`);
        await queryRunner.query(`ALTER TABLE "public"."transactions" DROP CONSTRAINT "FK_93e6fcc5847cbe879c000cf5382"`);
        await queryRunner.query(`DROP TABLE "public"."transactions"`);
    }

}
