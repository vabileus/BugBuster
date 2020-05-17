import {MigrationInterface, QueryRunner} from "typeorm";

export class User1589671346927 implements MigrationInterface {
    name = 'User1589671346927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `username` varchar(255) NOT NULL, `userRole` varchar(255) NOT NULL DEFAULT 'User', `userProjectRole` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `user`", undefined);
    }

}
