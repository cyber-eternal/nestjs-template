import * as retry from 'async-retry';

interface IRetryOptions {
  retries?: number;
  factor?: number;
  minTimeout?: number;
  maxTimeout?: number;
  randomize?: boolean;
}

export default (retryOptions: IRetryOptions) => {
  const promiseCache = new Map();
  return (fn: (...args) => Promise<any>) =>
    (...args) => {
      const key = JSON.stringify(args);
      if (promiseCache.has(key)) {
        return promiseCache.get(key);
      }
      const promise = retry(() => fn(...args), retryOptions);
      promiseCache.set(key, promise);
      return promise;
    };
};
