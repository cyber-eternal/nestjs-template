export default {
  hostname: process.env.AMQP_HOST || 'localhost',
  port: parseInt(process.env.AMQP_PORT, 10) || 5672,
  username: process.env.AMQP_USERNAME || 'test',
  password: process.env.AMQP_PASSWORD || 'password',
  virtualHost: process.env.AMQP_VHOST || null,
  queuePrefix: process.env.AMQP_QUEUE_PREFIX || 'qa',
  get connectionString() {
    const { hostname, port, username, password, virtualHost } = this;
    if (virtualHost) {
      return `amqp://${username}:${password}@${hostname}:${port}/${virtualHost}`;
    }
    return `amqp://${username}:${password}@${hostname}:${port}`;
  },
};
