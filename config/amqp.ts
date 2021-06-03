export default {
  hostname: process.env.AMQP_HOST || 'localhost',
  port: parseInt(process.env.AMQP_PORT, 10) || 5672,
  username: process.env.AMQP_USERNAME || 'onsweb-docs',
  password: process.env.AMQP_PASSWORD || 'password',
  virtualHost: process.env.AMQP_VHOST || null,
  queuePrefix: process.env.AMQP_QUEUE_PREFIX || 'qa',
  sendMailQueue: 'send_mail',
  get connectionString() {
    const { hostname, port, username, password, virtualHost } = this;
    if (virtualHost) {
      return `amqp://${username}:${password}@${hostname}:${port}/${virtualHost}`;
    }
    return `amqp://${username}:${password}@${hostname}:${port}`;
  },
  get sendEmailFullQueue() {
    return this.queuePrefix + '-' + this.sendMailQueue;
  },
};
