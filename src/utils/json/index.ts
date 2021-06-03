export const safeJsonParse = (val) => {
  try {
    return JSON.parse(val);
  } catch (e) {
    console.error(e); // tslint:disable-line no-console
    return undefined;
  }
};
