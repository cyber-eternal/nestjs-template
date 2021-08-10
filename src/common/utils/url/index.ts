export const pathConverter = (path: string): string =>
  (path && path.replace('~', ' ').toLowerCase() + '/') || '';

// export const subfoldersWrapper = (subfolders: string): string | null =>
//   subfolders && subfolders.replace(/\/$/, '');

export const routeWrapper = (route: string): string => {
  let newRote = route.replace(/^(?!(\/))/, '/');

  if (!/\/$/.test(newRote)) {
    newRote += '/';
  }

  return newRote || '';
};
