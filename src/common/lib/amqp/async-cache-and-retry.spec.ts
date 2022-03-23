import * as retry from 'async-retry';
import asyncCacheAndRetry from './async-cache-and-retry';

jest.mock('async-retry', () => {
  return jest.fn(jest.requireActual('async-retry'));
});

describe('asyncCacheAndRetry()', () => {
  beforeEach(() => {
    retry.mockClear();
  });
  it('is a high order function', () => {
    expect(asyncCacheAndRetry).toEqual(expect.any(Function));
    // @ts-ignore
    expect(asyncCacheAndRetry()).toEqual(expect.any(Function));
    // @ts-ignore
    expect(asyncCacheAndRetry()()).toEqual(expect.any(Function));
  });
  it('resolves with values which promise resolves', async () => {
    const value = 'superSecretValue';
    const retryOptions = {};
    const fn = () => Promise.resolve(value);
    const promise = asyncCacheAndRetry(retryOptions)(fn)();
    await expect(promise).resolves.toEqual(value);
  });
  it('returns the same promise when arguments matches', async () => {
    const args = '123';
    const retryOptions = {};
    const fn = jest.fn().mockResolvedValue(null);
    const asyncCacheAndRetryForFn = asyncCacheAndRetry(retryOptions)(fn);
    const promise1 = asyncCacheAndRetryForFn(args);
    const promise2 = asyncCacheAndRetryForFn(args);
    expect(promise1).toBe(promise2);
  });
  it(`returns different promise when arguments don't match`, async () => {
    const args1 = '123';
    const args2 = '124';
    const retryOptions = {};
    const fn = jest.fn().mockResolvedValue(null);
    const asyncCacheAndRetryForFn = asyncCacheAndRetry(retryOptions)(fn);
    const promise1 = asyncCacheAndRetryForFn(args1);
    const promise2 = asyncCacheAndRetryForFn(args2);
    expect(promise1).not.toBe(promise2);
  });
  it('passes retryOptions and function to `async-retry`', async () => {
    const retryOptions = {
      retries: 10,
      minTimeout: 1,
      maxTimeout: 10,
      randomize: false,
      factor: 1,
    };
    const fn = jest.fn().mockResolvedValue(null);
    await asyncCacheAndRetry(retryOptions)(fn)();
    expect(retry).toHaveBeenCalledTimes(1);
    expect(retry).toHaveBeenCalledWith(expect.any(Function), retryOptions);
  });
});
