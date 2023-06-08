export const hasData = obj =>
  !(obj === undefined || obj === null || Object.keys(obj).length === 0);
