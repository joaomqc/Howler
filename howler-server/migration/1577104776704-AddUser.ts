import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUser1577104776704 implements MigrationInterface {
    name = 'AddUser1577104776704'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("userId" SERIAL NOT NULL, "username" character varying(16) NOT NULL, "email" character varying(256) NOT NULL, "password" character varying(256) NOT NULL, CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
