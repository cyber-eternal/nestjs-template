import amqpConnection from './amqp-connection';

it('is a function', () => {
  expect(amqpConnection).toEqual(expect.any(Function));
});
