import {MigrationInterface, QueryRunner} from "typeorm";

export class UserUpdate1589758666486 implements MigrationInterface {
    name = 'UserUpdate1589758666486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `userProjectRole` `userProjectRole` varchar(255) NOT NULL DEFAULT 'Developer'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `userProjectRole` `userProjectRole` varchar(255) NOT NULL", undefined);
    }

}
