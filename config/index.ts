export default async () => ({
  app: (await import('./app')).default,
  amqp: (await import('./amqp')).default,
  database: (await import('./database')).default,
  swagger: (await import('./swagger')).default,
});
