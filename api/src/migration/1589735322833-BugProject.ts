import {MigrationInterface, QueryRunner} from "typeorm";

export class BugProject1589735322833 implements MigrationInterface {
    name = 'BugProject1589735322833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `project` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `bug` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` text NOT NULL, `status` enum ('open', 'fixed', 'in_progress', 'closed') NOT NULL DEFAULT 'open', `projectId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `project` ADD CONSTRAINT `FK_7c4b0d3b77eaf26f8b4da879e63` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `bug` ADD CONSTRAINT `FK_9664e57ebbd639b92903b710cc2` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `bug` DROP FOREIGN KEY `FK_9664e57ebbd639b92903b710cc2`", undefined);
        await queryRunner.query("ALTER TABLE `project` DROP FOREIGN KEY `FK_7c4b0d3b77eaf26f8b4da879e63`", undefined);
        await queryRunner.query("DROP TABLE `bug`", undefined);
        await queryRunner.query("DROP TABLE `project`", undefined);
    }

}
