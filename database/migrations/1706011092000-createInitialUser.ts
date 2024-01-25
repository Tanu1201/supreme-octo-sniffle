import { MigrationInterface, QueryRunner } from 'typeorm';
import { config } from 'dotenv';
import { hash } from 'bcrypt';

config();

export class createInitialUser1706012145598 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users (email, name, password, role) VALUES ('${process.env.SUPERADMIN_EMAIL}', 'Super Admin', '${await hash(
        process.env.SUPERADMIN_PASSWORD,
        10,
      )}', 'SUPER ADMIN' )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users WHERE email = '${process.env.SUPERADMIN_EMAIL}'`);
  }
}
