export default {
  name: 'default',
  type: process.env.TYPEORM_TYPE || 'mariadb',
  host: process.env.TYPEORM_HOST || 'localhost',
  username: process.env.TYPEORM_USERNAME || 'guest',
  password: process.env.TYPEORM_PASSWORD || 'guest',
  database: process.env.TYPEORM_DATABASE || 'core',
  port: parseInt(process.env.TYPEORM_PORT, 10) || 3306,
  logging: process.env.TYPEORM_LOGGING === 'true',
  entities: ['**/*.entity.ts'],
  autoLoadEntities: true,
  migrations: ['migrations/**/*.ts'],
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'migrations',
  },
};
