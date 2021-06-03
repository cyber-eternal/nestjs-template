import { MigrationInterface, QueryRunner } from 'typeorm';

export class createDocumentsTable1619531054441 implements MigrationInterface {
  name = 'createDocumentsTable1619531054441';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE IF NOT EXISTS `documents` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `path` varchar(255) NOT NULL, `type` varchar(255) NOT NULL, `provider` varchar(255) NOT NULL, `clientCode` varchar(255) NOT NULL, `docSyncId` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `fileCreatedAt` varchar(255) NULL, `fileUpdatedAt` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `documents`');
  }
}
