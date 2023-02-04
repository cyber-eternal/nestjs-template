import { join } from 'path';

export default {
  name: process.env.TYPEORM_DATABASE,
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: parseInt(process.env.TYPEORM_PORT) || 3306,
  logging: process.env.TYPEORM_LOGGING === 'true',
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  autoLoadEntities: process.env.TYPEORM_AUTO_LOAD_ENTITIES === 'true',
  migrations: [join(__dirname, '..', 'migrations/**/*.ts')],
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'migrations',
  },
};
