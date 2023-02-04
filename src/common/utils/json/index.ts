export const safeJsonParse = (val: string) => {
  try {
    return JSON.parse(val);
  } catch (e) {
    console.error(e); // tslint:disable-line no-console
    return undefined;
  }
};
