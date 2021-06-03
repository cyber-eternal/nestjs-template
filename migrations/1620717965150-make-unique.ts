import {MigrationInterface, QueryRunner} from "typeorm";

export class makeUnique1620717965150 implements MigrationInterface {
    name = 'makeUnique1620717965150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `documents` ADD UNIQUE INDEX IF NOT EXISTS `IDX_07b9336f17003408cd3fed89a6` (`path`)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `documents` DROP INDEX `IDX_07b9336f17003408cd3fed89a6`");
    }

}
