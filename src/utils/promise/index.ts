export const promiseOrPromiseAll = (data: object | [], promise): Promise<any> =>
  Array.isArray(data)
    ? Promise.all(data.map((i: object) => promise(i)))
    : promise(data);
