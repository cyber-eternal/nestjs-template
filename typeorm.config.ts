import './setEnvironment';
import { DataSource, DataSourceOptions } from 'typeorm';
import dbConfig from '@root/config/database';

const config: DataSourceOptions = {
  host: dbConfig.host,
  type: 'mysql',
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '/App/Database/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/App/Database/Migrations/*{.ts,.js}'],
  migrationsRun: !!process.env.TYPEORM_MIGRATIONS_RUN,
  synchronize: !!process.env.TYPEORM_SYNCHRONIZE,
  logging: !!process.env.TYPEORM_LOGGING,
};

export const dataSource = new DataSource(config);
